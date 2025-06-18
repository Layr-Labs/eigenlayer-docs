# 🚨 Repository Archived – Deprecated as of June 17 2025

**Note:** This repository is no longer maintained and has been archived.

As of June 17 2025, this project is considered **deprecated** and is no longer receiving updates. 

## 📚 Documentation & Migration

The EigenLayer documentation has been migrated to the EigenCloud documentation:

👉 [EigenCloud Docs repo](https://github.com/Layr-Labs/eigencloud-docs)  
or  
👉 [EigenCloud Docs Website](https://docs.eigencloud.xyz/)

For information on EigenCloud, refer to the [EigenCloud blog](https://blog.eigencloud.xyz/introducing-eigencloud/).

This repository will remain publicly accessible in a **read-only** state.

### Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
yarn
```

### Local Development

```
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
yarn build
// to test out the fully built site
yarn serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
USE_SSH=true yarn deploy
```

Not using SSH:

```
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
