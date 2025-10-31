# modelpack.org

Official website for the ModelPack CNCF Sandbox project.

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## About ModelPack

ModelPack is a CNCF Sandbox project that provides a standardized format for packaging and distributing machine learning models. Learn more at:

- **Project Repository**: [https://github.com/modelpack/model-spec](https://github.com/modelpack/model-spec)
- **CNCF**: [https://www.cncf.io/projects/modelpack/](https://www.cncf.io/projects/modelpack/)
