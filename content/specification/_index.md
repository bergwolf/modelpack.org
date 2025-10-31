---
title: "Specification"
---

The CNCF ModelPack Specification defines a standard for packaging, distributing, and running AI models in cloud-native environments.

## Overview

The ModelPack specification provides a compatible way to package and distribute models based on the current [OCI image specification](https://github.com/opencontainers/image-spec/) and [the artifacts guidelines](https://github.com/opencontainers/image-spec/blob/main/manifest.md#guidelines-for-artifact-usage). 

For compatibility reasons, it only contains part of the model metadata, and handles model artifacts as opaque binaries. However, it provides a convenient way to package AI models in the container image format and can be used as [OCI volume sources](https://github.com/kubernetes/enhancements/issues/4639) in Kubernetes environments.

## Rationale

Looking back in history, there are clear trends in the evolution of infrastructure. At first, there is the machine-centric infrastructure age. GNU/Linux was born there and we saw a boom of Linux distributions then. Then comes the Virtual Machine-centric infrastructure age, where we saw the rise of cloud computing and the development of virtualization technologies. The third age is the container-centric infrastructure, and we saw the rise of container technologies like Docker and Kubernetes. The fourth age, which has just begun, is the AI model-centric infrastructure age, where we will see a burst of technologies and projects around AI model development and deployment.

Each of the new ages has brought new technologies and new ways of thinking. The container-centric infrastructure has brought us the OCI image specification, which has become the standard for packaging and distributing software. The AI model-centric infrastructure will bring us new ways of packaging and distributing AI models. This model specification is an attempt to define a standard that aligns with the container standards that organizations and individuals have successfully relied on for the last decade.

## Technical Details

The full technical specification is available in the [ModelPack GitHub repository](https://github.com/modelpack/model-spec/blob/main/docs/spec.md).

### Key Components

The ModelPack specification consists of:

1. **Model Artifact Format**: Based on OCI artifacts with specific media types for model content
2. **Metadata Schema**: Standardized model metadata including:
   - Model name and version
   - Framework information (PyTorch, TensorFlow, ONNX, etc.)
   - Hardware requirements
   - Input/output specifications
3. **Distribution Protocol**: Uses OCI distribution specification for registry interactions
4. **Volume Integration**: Kubernetes CSI driver for mounting models as volumes

### Media Types

ModelPack uses specific OCI media types to identify model artifacts:

- **Manifest**: `application/vnd.cncf.modelpack.manifest.v1+json`
- **Config**: `application/vnd.cncf.modelpack.config.v1+json`
- **Model Layer**: `application/vnd.cncf.modelpack.model.layer.v1.tar+gzip`

### Model Metadata

Model artifacts include metadata in the config object:

```json
{
  "name": "example-model",
  "version": "1.0.0",
  "framework": "pytorch",
  "frameworkVersion": "2.0.0",
  "format": "safetensors",
  "architecture": "transformer",
  "parameters": 7000000000,
  "precision": "float16"
}
```

## Implementation Guidelines

### For Registry Providers

OCI-compatible registries can host ModelPack artifacts without modification. Registries may optionally provide:

- Model-specific UI and metadata display
- Model scanning and validation
- Model usage analytics

### For Tool Developers

Tools can interact with ModelPack artifacts using standard OCI client libraries. The reference implementation [modctl](https://github.com/modelpack/modctl) demonstrates best practices.

### For Platform Integrators

Kubernetes platforms can mount ModelPack artifacts using:

1. **Model CSI Driver**: Native volume mounting for models
2. **OCI Volume Sources**: Kubernetes 1.31+ feature for direct OCI artifact mounting
3. **Init Containers**: Traditional approach for downloading models

## Compatibility

ModelPack is designed for maximum compatibility:

- **OCI Registries**: Works with Docker Hub, Harbor, Google Container Registry, Amazon ECR, Azure Container Registry, and any OCI-compliant registry
- **Build Tools**: Compatible with existing OCI build tools and workflows
- **Security Tools**: Integrates with image signing (Sigstore, Notary v2) and vulnerability scanning
- **Distribution**: Works with OCI distribution tools like Dragonfly and ORAS

## Version History

The ModelPack specification is currently in active development as part of the CNCF Sandbox.

- **v0.1.0**: Initial specification defining OCI-based model packaging
- **Current**: Ongoing refinement based on community feedback and real-world usage

## Contributing to the Specification

The ModelPack specification is developed in the open. We welcome:

- **Feedback**: Share your use cases and requirements
- **Proposals**: Submit enhancement proposals via GitHub issues
- **Implementation**: Build tools and integrations that use the specification
- **Testing**: Help validate the specification with real-world scenarios

Visit the [ModelPack GitHub repository](https://github.com/modelpack/model-spec) to get involved.

## References

- [Full Specification Document](https://github.com/modelpack/model-spec/blob/main/docs/spec.md)
- [OCI Image Specification](https://github.com/opencontainers/image-spec/)
- [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec/)
- [Kubernetes OCI Volume Sources](https://kubernetes.io/blog/2024/08/16/kubernetes-1-31-image-volume-source/)
