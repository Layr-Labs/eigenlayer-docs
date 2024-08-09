// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { themes } from "prism-react-renderer";
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
import math from "remark-math";
import katex from "rehype-katex";

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

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  markdown: {
    mermaid: true,
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
            to: "/eigenlayer/restaking-guides/restaking-user-guide/testnet/rewards-claiming/rewards-claiming-overview",
          },
          {
            from: "/eigenlayer/restaking-guides/restaking-user-guide/restaker-delegation/stake-and-delegate-eigen",
            to: "/eigenlayer/restaking-guides/restaking-user-guide/",
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
      href: "https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-A6M2d8kxCUZh9Q52KpBcIVtWAE5wTS9ITC9SWI4FZB70xif52XLThf+PI5tHx/S3",
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
          showLastUpdateTime: false,
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
