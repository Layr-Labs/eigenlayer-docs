// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import fs from "node:fs";
import path from "node:path";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "EigenLayer",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.eigenlayer.xyz/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "layr-labs", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  markdown: {
    mermaid: true
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    async function pluginLlmsTxt(context) {
      return {
        name: "llms-txt-plugin",
        loadContent: async () => {
          const { siteDir } = context;
          const contentDir = path.join(siteDir, "docs");
          const developersDir = path.join(siteDir, "docs", "developers")
          const operatorsDir = path.join(siteDir, "docs", "operators")
          const allMd = [];
          const developersMd = []
          const operatorsMd = []

          // recursive function to get all mdx files
          const getMdxFiles = async (baseDir, writeDir) => {
            const entries = await fs.promises.readdir(baseDir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = path.join(baseDir, entry.name);
              if (entry.isDirectory()) {
                await getMdxFiles(fullPath, writeDir);
              } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
                const content = await fs.promises.readFile(fullPath, "utf8");
                writeDir.push(content);
              }
            }
          };

          await getMdxFiles(developersDir, developersMd)
          await getMdxFiles(contentDir, allMd);
          await getMdxFiles(operatorsDir, operatorsMd);
          return { allMd , developersMd, operatorsMd};
        },
        postBuild: async ({ content, routes, outDir }) => {
          const { allMd, developersMd, operatorsMd } = content;
          const { siteDir } = context;

          // Write concatenated Markdown content
          await fs.promises.writeFile(path.join(siteDir, "static", "llms-full.md"), allMd.join("\n\n---\n\n"));
          await fs.promises.writeFile(path.join(siteDir, "static", "avs-developer-docs.md"), developersMd.join("\n\n---\n\n"));
          await fs.promises.writeFile(path.join(siteDir, "static", "operators-developer-docs.md"), operatorsMd.join("\n\n---\n\n"));

          // we need to dig down several layers:
          // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
          const docsPluginRouteConfig = routes.filter(
            (route) => route.plugin.name === "docusaurus-plugin-content-docs"
          )[0];

          // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
          const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter(
            (route) => route.path === "/"
          )[0];

          // A little type checking first
          if (!allDocsRouteConfig?.props?.version) {
            return;
          }

          // this route config has a `props` property that contains the current documentation.
          const currentVersionDocsRoutes = (
            allDocsRouteConfig.props.version
          ).docs;

          // for every single docs route we now parse a path (which is the key) and a title
          const docsRecords = Object.entries(currentVersionDocsRoutes).map(([path, record]) => {
            return `- [${record.title}](${path}): ${record.description}`;
          });

          // Build up llms.txt file
          const llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join("\n")}`;

          // Write llms.txt file
          try {
            fs.writeFileSync(path.join(siteDir, "static", "llms.md"), llmsTxt);
          } catch (err) {
            throw err;
          }
        },
      };
    },
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/overview/readme/",
            to: "/eigenlayer/overview/",
          },
          {
            from: "/overview/privacy-policy",
            to: "/eigenlayer/legal/privacy-policy",
          },
          {
            from: "/overview/terms-of-service",
            to: "/eigenlayer/legal/terms-of-service",
          },
          {
            from: "/overview/disclaimers",
            to: "/eigenlayer/legal/disclaimers",
          },
          // This is implicit, covered by the function case below
          // {
          //   from: "/overview/",
          //   to: "/eigenlayer/overview/",
          // },
          {
            from: "/overview/intro/",
            to: "/eigenlayer/overview/",
          },
          {
            from: "/faqs/operator-general-faq",
            to: "/operators/reference/operator-faq",
          },
          {
            from: "/operators/operator-guides/operator-sets",
            to: "/operators/howto/operator-sets",
          },
          {
            from: "/eigenlayer/concepts/slashing",
            to: "/eigenlayer/concepts/slashing/slashing-concept",
          },
          {
            from: "/operators/operator-guides/key-management/intro-key-management",
            to: "/eigenlayer/concepts/keys-and-signatures",
          },
          {
            from: "/operators/operator-guides/operator-introduction",
            to: "/operators/concepts/operator-introduction",
          },
          {
            from: "/operators/operator-guides/avs-operator-risks-mitigations-bp",
            to: "/operators/howto/avs-operator-risks-mitigations-bp",
          },
          {
            from: "/operators/operator-guides/key-management/institutional-operators",
            to: "/operators/howto/managekeys/institutional-operators",
          },
          {
            from: "/operators/operator-guides/key-management/solo-stakers",
            to: "/operators/howto/managekeys/solo-stakers",
          },
          {
            from: "/operators/operator-guides/operator-content-guidelines",
            to: "/operators/howto/operator-content-guidelines",
          },
          {
            from: "/operators/concepts/intro-key-management",
            to: "/eigenlayer/concepts/keys-and-signatures",
          },
          {
            from: "/operators/operator-guides/operator-installation",
            to: "/operators/howto/operator-installation",
          },
          {
            from: "/operators/operator-guides/operator-rewards-config",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/operators/operator-guides/troubleshooting",
            to: "/operators/howto/troubleshooting",
          },
          {
            from: "/operators/operator-guides/operator-faq",
            to: "/operators/reference/operator-faq",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-instructions",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/restaker-delegation/stake-and-delegate-eigen",
            to: "/restakers/concepts/overview",
          },
          
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-overview",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/claim-rewards/via-ui",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/claim-rewards/via-cli",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-faq",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/stage-2-testnet/obtaining-testnet-eth-and-liquid-staking-tokens-lsts",
            to: "/restakers/restaking-guides/testnet/obtaining-testnet-eth-and-liquid-staking-tokens-lsts",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod-and-set-withdrawal-credentials/repointing-a-validators-withdrawal-credentials",
            to: "/restakers/restaking-guides/restaking-user-guide/native-restaking/#restake-new-validator-native-beacon-chain-eth",
          },
          {
            from: "/overview/eigenlayer-privacy-policy",
            to: "/eigenlayer/legal/privacy-policy",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/",
            to: "/restakers/concepts/overview",
          },
         {
           from: "/restakers/restaking-guides/overview",
           to: "/restakers/concepts/overview",
         },

          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/",
            to: "/restakers/restaking-guides/testnet/",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/obtaining-testnet-eth-and-liquid-staking-tokens-lsts",
            to: "/restakers/restaking-guides/testnet/obtaining-testnet-eth-and-liquid-staking-tokens-lsts",
          },
          {
            from: "/developers",
            to: "/developers/Concepts/avs-developer-guide",
          },
          {
            from: "/eigenlayer/economy/economy-overview",
            to: "/eigenlayer/economy/economy-calculation-and-formulas",
          },
          {
            from: "/developers/avs-developer-guide",
            to: "/developers/Concepts/avs-developer-guide",
          },
          {
            from: "/developers/avs-developer-best-practices",
            to: "/developers/Reference/avs-developer-best-practices",
          },
          {
            from: "/developers/avs-opset-slashing",
            to: "/developers/HowTo/build/slashing/implement-slashing",
          },
          {
            from: "/developers/avs-permissionlesss",
            to: "/developers/HowTo/build/avs-permissionlesss",
          },
          {
            from: "/developers/deployment-testnet-mainnet",
            to: "/developers/HowTo/deploy/deployment-testnet-mainnet",
          },
          {
            from: "/developers/how-to-build-an-avs",
            to: "/developers/HowTo/get-started/implement-minimum-onchain-components",
          },
          {
            from: "/developers/HowTo/how-to-build-an-avs",
            to: "/developers/HowTo/get-started/implement-minimum-onchain-components",
          },
          {
            from: "/developers/avs-dashboard-onboarding",
            to: "/developers/HowTo/publish/onboard-avs-dashboard",
          },
          {
            from: "/developers/rewards",
            to: "/eigenlayer/concepts/rewards/rewards-concept",
          },
          {
            from: "/developers/support",
            to: "/developers/HowTo/get-started/support",
          },
          {
            from: "/developers/resources",
            to: "/developers/Reference/resources",
          },
          {
            from: "/eigenlayer/rewards-claiming/claim-rewards/via-cli",
            to: "/operators/howto/claimrewards/claim-rewards-cli",
          },
          {
            from: "/eigenlayer/rewards-claiming/claim-rewards/via-ui",
            to: "/restakers/restaking-guides/claim-rewards-app",
          },
          {
            from: "/eigenlayer/rewards-claiming/rewards-claiming-overview",
            to: "/eigenlayer/concepts/rewards/rewards-claiming",
          },
          {
            from: "/developers/HowTo/slashing/design-operator-set",
            to: "/developers/HowTo/build/slashing/design-operator-set",
          },
          {
            from: "/developers/HowTo/build/how-to-build-an-avs",
            to: "/developers/HowTo/get-started/implement-minimum-onchain-components",
          },
          {
            from: "/developers/HowTo/slashing/migrate-to-operatorsets",
            to: "/developers/HowTo/build/slashing/migrate-to-operatorsets",
          },
          {
            from: "/developers/HowTo/slashing/slashing-veto-committee-design",
            to: "/developers/HowTo/build/slashing/slashing-veto-committee-design",
          },
          {
            from: "/developers/HowTo/build/implement-minimum-onchain-components",
            to: "/developers/HowTo/get-started/implement-minimum-onchain-components",
          },
          {
            from: "/developers/quickstart",
            to: "/developers/HowTo/get-started/quickstart",
          },
        ],
        createRedirects(existingPath) {

          // eigenlayer redirects
          if (existingPath.includes('/eigenlayer')) {
            return [
              existingPath.replace('/eigenlayer', ''),
            ];
          }

          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      
      {
        docs: {
          breadcrumbs: true,
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false
        },
        

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },

        gtag: {
          trackingID: 'G-GN5RBJ9VRL',
          anonymizeIP: true,
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/eigenlayer-logo.png',

      navbar: {
        title: "EigenLayer",
        logo: {
          alt: "EigenLayer Logo",
          src: "img/eigenlayer-logo.png",
          srcDark: "img/eigenlayer-logo-dark.png",
        },
        items: [
          {
            to: "eigenlayer/overview",
            label: "EigenLayer",
            position: "left",
            activeBasePath: 'eigenlayer/',
          },
          {
            to: "developers/Concepts/avs-developer-guide",
            label: "Developers",
            position: "left",
            activeBasePath: 'developers/',
          },
          {
            to: "operators/concepts/operator-introduction",
            label: "Operators",
            position: "left",
            activeBasePath: 'operators/',
          },

          {
            to: "restakers/concepts/overview",
            label: "Restakers",
            position: "left",
            activeBasePath: 'restakers/concepts',
          },

          {
            href: "https://github.com/Layr-Labs",
            className: "header--github-link",
            "aria-label": "GitHub repository",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "EigenLayer",
            items: [
              {
                label: "About",
                href: "https://www.eigenlayer.xyz/",
              },
              {
                label: "Privacy Policy",
                href: "https://docs.eigenlayer.xyz/eigenlayer/legal/privacy-policy",
              },
              {
                label: "Terms of Service",
                href: "https://docs.eigenlayer.xyz/eigenlayer/legal/terms-of-service",
              },
              {
                label: "Disclaimers",
                href: "https://docs.eigenlayer.xyz/eigenlayer/legal/disclaimers",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Support",
                href: "https://docs.eigenlayer.xyz/developers/HowTo/get-started/support",
              },
              {
                label: "Forum",
                href: "https://forum.eigenlayer.xyz/",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/eigenlayer",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/eigenlayer",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Layr-Labs",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@EigenLayer",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Eigen Labs, Inc.`,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash","solidity"],
      },
    }),
  scripts: [
    // Object format.
    {
      src: '/js/intercom.js',
      async: true,
    },
    {
      src: '/js/eigenda-redirects.js',
      async: false,
    },
    {
      src: '/js/avs-guide-redirects.js',
      async: false,
    },
    {
      src: '/js/restakers-redirects.js',
      async: false,
    },
    {
      src: '/js/operators-redirects.js',
      async: false,
    },
    {
      src: '/js/eigen-token-redirect.js',
      async: false,
    },
    {
      src: '/js/userback.js',
      async: true,
    },
  ],
  themes: [
    [
      // @ts-ignore
      require.resolve("@easyops-cn/docusaurus-search-local"),
      // @ts-ignore
      ({
        // `hashed` is recommended as long-term-cache of index file is possible
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/",
      }),
    ],
    '@docusaurus/theme-mermaid'
  ],
};

module.exports = config;