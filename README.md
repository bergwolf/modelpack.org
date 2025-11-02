# modelpack.org

Official website for the ModelPack project (https://modelpack.org)

## About

This repository contains the source code for the ModelPack website, a static site built with [Hugo](https://gohugo.io/).

ModelPack is a CNCF Sandbox project providing a vendor-neutral, open source specification standard to package, distribute and run AI models in cloud native environments.

## Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) v0.139.3 or later (extended version)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/bergwolf/modelpack.org.git
cd modelpack.org
```

2. Start the Hugo development server:
```bash
hugo server
```

3. Open your browser to http://localhost:1313

### Building

To build the static site:

```bash
hugo
```

The generated site will be in the `public/` directory.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## Content Structure

- `/content/getting-started/` - Getting started guide
- `/content/specification/` - Technical specification documentation
- `/content/ecosystem/` - Ecosystem and integrations
- `/content/community/` - Community and contribution information
- `/layouts/` - Hugo templates
- `/static/` - Static assets (CSS, images, etc.)

## Contributing

We welcome contributions! Please see the [ModelPack contributing guidelines](https://github.com/modelpack/model-spec/blob/main/CONTRIBUTING.md).

## License

Apache 2.0 License. See [LICENSE](LICENSE) for more information.

## Contact

- [CNCF Slack #modelpack](https://cloud-native.slack.com/archives/C07T0V480LF)
- [GitHub Discussions](https://github.com/modelpack/model-spec/discussions)
