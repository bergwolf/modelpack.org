---
title: "Ecosystem"
---

The ModelPack specification is designed to integrate seamlessly with existing cloud-native and AI/ML tools, creating a comprehensive ecosystem for model management.

## Architecture Overview

The ModelPack ecosystem brings together infrastructure, tooling, and platforms to create a complete solution for AI model packaging and distribution:

- **Core Infrastructure**: OCI registries and distribution systems
- **Management Tools**: CLI tools and packaging platforms
- **Kubernetes Integration**: CSI drivers and volume sources
- **ML Platforms**: Integration with popular AI/ML tools

## Core Infrastructure

### OCI Registries

ModelPack artifacts can be stored in any OCI-compliant registry:

#### Harbor

[Harbor](https://goharbor.io/) is an open source, enterprise-grade OCI registry that provides:

- **Security Scanning**: Built-in vulnerability scanning for model artifacts
- **Access Control**: Role-based access control (RBAC) for model repositories
- **Replication**: Multi-registry replication for global distribution
- **Content Trust**: Integration with Notary for signing and verifying models

Harbor can host ModelPack artifacts with full support for OCI artifact types.

#### Other Registry Options

- **Docker Hub**: Public model distribution
- **Google Container Registry (GCR)**: Google Cloud integration
- **Amazon Elastic Container Registry (ECR)**: AWS integration
- **Azure Container Registry (ACR)**: Azure integration
- **GitHub Container Registry (GHCR)**: GitHub integration
- **Quay.io**: Red Hat's enterprise registry

### Model Distribution

#### Dragonfly

[Dragonfly](https://d7y.io/) is a P2P-based file distribution system that provides:

- **Efficient Distribution**: P2P technology for fast model distribution at scale
- **Bandwidth Optimization**: Reduces registry bandwidth usage
- **Large File Support**: Optimized for distributing large AI models
- **Multi-Cloud**: Works across different cloud providers

Dragonfly can accelerate ModelPack artifact distribution in large-scale deployments.

#### ORAS

[ORAS](https://oras.land/) (OCI Registry As Storage) provides:

- **Generic OCI Client**: Push and pull any OCI artifact
- **Attachment Support**: Attach signatures, SBOMs, and other metadata
- **Reference Types**: Link related artifacts together

ORAS can be used to work with ModelPack artifacts from the command line.

## Management Tools

### modctl

[modctl](https://github.com/modelpack/modctl) is the official CLI tool for ModelPack:

- **Build**: Package models into OCI artifacts
- **Push/Pull**: Interact with OCI registries
- **Inspect**: View model metadata
- **Convert**: Import models from other formats

```bash
# Install modctl
curl -sSL https://raw.githubusercontent.com/modelpack/modctl/main/install.sh | sh

# Use modctl
modctl build -t myregistry.com/mymodel:v1.0 ./model-dir
modctl push myregistry.com/mymodel:v1.0
modctl pull myregistry.com/mymodel:v1.0
```

### KitOps

[KitOps](https://kitops.ml/) is a ModelKit packaging and deployment platform that supports the ModelPack specification:

- **ModelKit Format**: Package models with code, data, and configuration
- **Version Control**: Git-like version control for ML projects
- **Collaboration**: Share models and ModelKits across teams
- **Deployment**: Deploy models to various platforms

KitOps provides a higher-level abstraction on top of ModelPack for complete ML project management.

## Kubernetes Integration

### Model CSI Driver

[Model CSI Driver](https://github.com/modelpack/model-csi-driver) is a Kubernetes CSI driver for mounting ModelPack artifacts as persistent volumes:

- **Native Mounting**: Mount models directly as volumes in pods
- **Caching**: Efficient model caching on nodes
- **Version Management**: Automatic model version updates
- **Multi-Tenancy**: Isolated model access per namespace

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: inference-pod
spec:
  containers:
    - name: app
      image: inference-server:latest
      volumeMounts:
        - name: model
          mountPath: /model
  volumes:
    - name: model
      csi:
        driver: model.csi.modelpack.org
        volumeAttributes:
          modelRef: "myregistry.com/mymodel:v1.0"
```

### OCI Volume Sources

Kubernetes 1.31+ supports [OCI volume sources](https://kubernetes.io/blog/2024/08/16/kubernetes-1-31-image-volume-source/), allowing direct mounting of OCI artifacts:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: model-pod
spec:
  containers:
    - name: app
      image: app:latest
      volumeMounts:
        - name: model
          mountPath: /model
  volumes:
    - name: model
      image:
        reference: myregistry.com/mymodel:v1.0
```

### CRI-O

[CRI-O](https://cri-o.io/) is a lightweight container runtime that supports OCI artifacts:

- **OCI Native**: Full support for OCI artifact types
- **Kubernetes Integration**: Native Kubernetes runtime
- **Performance**: Optimized for Kubernetes workloads

CRI-O can pull and cache ModelPack artifacts for Kubernetes pods.

## ML Platform Integration

ModelPack is designed to integrate with existing ML platforms and tools:

### Hugging Face

[Hugging Face](https://huggingface.co/) is the leading platform for ML models:

- **Model Hub**: Download models from Hugging Face
- **Package**: Use modctl to package Hugging Face models
- **Distribute**: Push to OCI registries for standardized distribution

```bash
# Download from Hugging Face
hf download Qwen/Qwen3-0.6B --local-dir ./model

# Package as ModelPack artifact
modctl build -t myregistry.com/qwen:v1.0 ./model
```

### Kubeflow

[Kubeflow](https://www.kubeflow.org/) is a comprehensive ML platform for Kubernetes:

- **Model Registry**: Integration with Kubeflow model registry
- **Pipelines**: Use ModelPack artifacts in ML pipelines
- **Serving**: Deploy ModelPack models with KFServing

### Ollama

[Ollama](https://github.com/ollama/ollama) is a tool for running large language models locally:

- **Model Format**: Support for converting Ollama models to ModelPack
- **Distribution**: Share Ollama-compatible models via OCI registries

### Lepton

[Lepton](https://www.lepton.ai/) is a platform for building and deploying AI applications:

- **Model Packaging**: Package Lepton models as ModelPack artifacts
- **Deployment**: Deploy ModelPack artifacts on Lepton infrastructure

## Integration Examples

### Complete Workflow

1. **Develop**: Train model with your preferred framework (PyTorch, TensorFlow, etc.)
2. **Package**: Use modctl to create a ModelPack artifact
3. **Store**: Push to Harbor or any OCI registry
4. **Scan**: Use Harbor's security scanning for vulnerabilities
5. **Distribute**: Use Dragonfly for efficient global distribution
6. **Deploy**: Mount in Kubernetes using Model CSI Driver
7. **Serve**: Run inference workloads using your serving framework

### Multi-Registry Setup

```bash
# Build once
modctl build -t mymodel:v1.0 ./model-dir

# Push to multiple registries
modctl push myregistry.com/mymodel:v1.0
modctl push harbor.example.com/ml-models/mymodel:v1.0
modctl push ghcr.io/myorg/mymodel:v1.0
```

## Community Projects

We actively encourage integration with other projects in the cloud-native and AI/ML ecosystems:

- **Model Registries**: Harbor, Kubeflow Model Registry
- **ML Platforms**: Hugging Face, Kubeflow, Lepton
- **Packaging Tools**: KitOps, Ollama
- **Distribution**: Dragonfly, ORAS
- **Security**: Sigstore, Notary v2

If you're building a project that could benefit from ModelPack integration, please reach out via [GitHub Discussions](https://github.com/modelpack/model-spec/discussions) or [CNCF Slack](https://cloud-native.slack.com/archives/C07T0V480LF).

## Building on ModelPack

The ModelPack specification is designed to be extended and built upon:

- **Custom Tooling**: Build specialized tools for your organization
- **Registry Extensions**: Add model-specific features to registries
- **Platform Integration**: Integrate ModelPack into your ML platform
- **Automation**: Create automated workflows for model management

See the [specification](/specification/) and [GitHub repository](https://github.com/modelpack/model-spec) for technical details on building ModelPack-compatible tools.
