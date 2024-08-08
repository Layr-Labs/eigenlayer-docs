// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const math = require("remark-math");
const katex = require("rehype-katex");

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
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/overview/readme/",
            to: "/eigenlayer/overview/",
          },
          {
            from: "/overview/eigenlayer-privacy-policy",
            to: "/eigenlayer/legal/eigenlayer-privacy-policy",
          },
          {
            from: "/overview/terms-of-service",
            to: "/eigenlayer/legal/terms-of-service",
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
            from: "/eigenda-guides/eigenda-overview/",
            to: "/eigenda/overview/",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/",
            to: "/eigenda/integrations-guides/rollup-guides/",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/building-on-top-of-eigenda",
            to: "/eigenda/integrations-guides/rollup-guides/",
          },
          {
            from: "/eigenda/rollup-guides/tutorial",
            to: "/eigenda/integrations-guides/rollup-guides/",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/system-performance-and-customization",
            to: "/eigenda/integrations-guides/dispersal/api-documentation/metering-and-rate-limits",
          },
          {
            from: "/eigenda/system-performance-and-customization",
            to: "/eigenda/integrations-guides/dispersal/api-documentation/metering-and-rate-limits",
          },
          {
            from: "/eigenda/performance-metrics",
            to: "/eigenda/integrations-guides/dispersal/api-documentation/metering-and-rate-limits",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/blob-explorer",
            to: "/eigenda/networks/",
          },
          {
            from: "/eigenda/blob-explorer",
            to: "/eigenda/networks/",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/op-stack-+-eigenda-user-guide",
            to: "/eigenda/integrations-guides/rollup-guides/op-stack",
          },
          {
            from: "/eigenda/rollup-guides/op-stack",
            to: "/eigenda/integrations-guides/rollup-guides/op-stack",
          },
          {
            from: "/eigenda/integrations-guides/rollup-guides/op-stack/overview",
            to: "/eigenda/integrations-guides/rollup-guides/op-stack",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/op-stack-+-eigenda-user-guide/deploying-op-stack",
            to: "/eigenda/integrations-guides/rollup-guides/op-stack",
          },
          {
            from: "/eigenda/integrations-guides/rollup-guides/op-stack/deployment",
            to: "/eigenda/integrations-guides/rollup-guides/op-stack",
          },
          {
            from: "/eigenda-guides/integrations-overview",
            to: "/eigenda/integrations-guides/rollup-guides/integrations-overview",
          },
          {
            from: "/eigenda/integrations-overview",
            to: "/eigenda/integrations-guides/rollup-guides/integrations-overview",
          },
          {
            from: "/eigenda/rollup-guides/integrations-overview",
            to: "/eigenda/integrations-guides/rollup-guides/integrations-overview",
          },
          {
            from: "/operator-guides/avs-installation-and-registration/eigenda-operator-guide/",
            to: "/eigenda/operator-guides/overview",
          },
          {
            from: "/operator-guides/avs-installation-and-registration/eigenda-operator-guide/troubleshooting",
            to: "/eigenda/operator-guides/troubleshooting",
          },
          {
            from: "/faqs/eigenda-operator-faq",
            to: "/eigenda/operator-guides/operator-faq",
          },
          {
            from: "/faqs/operator-general-faq",
            to: "/eigenlayer/operator-guides/operator-faq",
          },
          {
            from: "/eigenda-guides/eigenda-rollup-user-guides/orbit/",
            to: "/eigenda/integrations-guides/rollup-guides/orbit",
          },
          {
            from: "/eigenda/rollup-guides/orbit/",
            to: "/eigenda/integrations-guides/rollup-guides/orbit",
          },
          {
            from: "/eigenda/integrations-guides/rollup-guides/orbit/overview",
            to: "/eigenda/integrations-guides/rollup-guides/orbit",
          },
          {
            from: "/eigenlayer/avs-guides/avs-development-guide",
            to: "/eigenlayer/avs-guides/how-to-build-an-avs",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod/",
            to: "/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod-and-set-withdrawal-credentials/",
          },
          {
            from: "/eigenda/rollup-guides/",
            to: "/eigenda/integrations-guides/rollup-guides/",
          },
          {
            from: "/eigenda/rollup-guides/api-error-codes",
            to: "/eigenda/integrations-guides/dispersal/api-documentation/error-codes",
          },
          {
            from: "/eigenda/rollup-guides/blob-encoding",
            to: "/eigenda/integrations-guides/dispersal/api-documentation/blob-serialization-requirements",
          },
          {
            from: "/eigenda/integrations-guides/dispersal/disperser-golang-grpc-client",
            to: "/eigenda/integrations-guides/dispersal/clients/golang-client",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-instructions",
            to: "/eigenlayer/rewards-claiming/rewards-claiming-overview",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/restaker-delegation/stake-and-delegate-eigen",
            to: "/eigenlayer/restaking-guides/restaking-user-guide/",
          },
          
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-overview",
            to: "/eigenlayer/rewards-claiming/rewards-claiming-overview",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/claim-rewards/via-ui",
            to: "/eigenlayer/rewards-claiming/claim-rewards/via-ui",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/claim-rewards/via-cli",
            to: "/eigenlayer/rewards-claiming/claim-rewards/via-cli",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-faq",
            to: "/eigenlayer/rewards-claiming/rewards-claiming-faq",
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
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: false
        },
        blog: {
          blogTitle: "EigenLayer Status",
          postsPerPage: "ALL",
          routeBasePath: "/status",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },

        gtag: {
          trackingID: 'G-GN5RBJ9VRL',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/eigenlayer-logo.png',

      navbar: {
        title: "EigenLayer Docs",
        logo: {
          alt: "EigenLayer Logo",
          src: "img/eigenlayer-logo.png",
        },
        items: [
          {
            to: "eigenlayer/overview",
            label: "EigenLayer",
            position: "left",
            activeBasePath: 'eigenlayer/',
          },
          {
            to: "eigenda/overview",
            label: "EigenDA",
            position: "left",
            activeBasePath: 'eigenda/',
          },
          {
            to: "status",
            label: "Status",
            position: "left",
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
                href: "https://docs.eigenlayer.xyz/eigenlayer/legal/eigenlayer-privacy-policy",
              },
              {
                label: "Terms of Service",
                href: "https://docs.eigenlayer.xyz/eigenlayer/legal/terms-of-service",
              },
            ],
          },
          {
            title: "Community",
            items: [
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
                label: "Discourse",
                href: "http://forum.eigenlayer.xyz/",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@EigenLayer",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Layr Labs`,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash"],
      },
    }),
  scripts: [
    // Object format.
    {
      src: '/js/intercom.js',
      async: true,
    },
  ],
  themes: [
    [
      // @ts-ignore
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
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
