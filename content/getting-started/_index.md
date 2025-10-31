---
title: "Getting Started"
---

Welcome to the CNCF ModelPack Specification project! This guide will help you understand the specification and its role in the broader AI/ML ecosystem.

## What is the ModelPack Specification?

The CNCF ModelPack Specification is an open standard for packaging, distributing, and running AI models in cloud-native environments. It builds upon the proven [OCI (Open Container Initiative) image specification](https://github.com/opencontainers/image-spec/) to bring the same standardization and interoperability benefits that containers brought to application deployment to the world of AI models.

### Why This Matters

We are entering the fourth age of infrastructure evolution:

1. **Machine-centric** (GNU/Linux distributions)
2. **Virtual Machine-centric** (Cloud computing, virtualization)
3. **Container-centric** (Docker, Kubernetes, OCI standards)
4. **AI Model-centric** (Current era - AI model development and deployment)

Just as OCI standards revolutionized how we package and distribute applications, the ModelPack specification aims to standardize AI model packaging and distribution, moving away from vendor-specific formats toward an open, interoperable standard.

## Key Benefits

- **Standardization**: Use familiar OCI tooling and infrastructure for AI models
- **Interoperability**: Models packaged once work across different platforms and tools
- **Security**: Leverage existing OCI security features like image signing and vulnerability scanning
- **Efficiency**: Native Kubernetes integration eliminates the need for manually downloading models
- **Versioning**: Use OCI tags and digests for robust model version control
- **Ecosystem**: Build on top of the mature container ecosystem, rather than creating new infrastructure

## Getting Started

### Prerequisites

- Basic understanding of containers and OCI concepts
- Access to an OCI-compatible registry (Docker Hub, Harbor, etc.)

### Step 1: Install modctl

The `modctl` tool is the CLI for building, pushing, pulling, and managing OCI model artifacts. Follow the instructions in the [modctl GitHub repository](https://github.com/modelpack/modctl/blob/main/docs/getting-started.md#installation) to install it.

Quick installation:

```bash
curl -sSL https://raw.githubusercontent.com/modelpack/modctl/main/install.sh | sh
```

### Step 2: Install Model CSI Driver (Optional)

If you plan to use models in Kubernetes, install the Model CSI Driver by following the instructions in the [Model CSI Driver repository](https://github.com/modelpack/model-csi-driver/blob/main/docs/getting-started.md#helm-installation).

### Step 3: Download a Model

To package a model, you need to download it to your local directory. The following example shows how to download a model from Hugging Face:

```bash
export HF_MODEL="Qwen/Qwen3-0.6B"
export MODEL_PATH=my-model-directory

# Install the huggingface cli
pip install 'huggingface_hub'

# Login to huggingface cli
hf auth login --token <your-huggingface-token>

# Download a model
hf download $HF_MODEL --local-dir $MODEL_PATH
```

### Step 4: Package Your First Model

The following script will walk you through how to build a ModelPack format model artifact and push it to the model registry:

```bash
# Modify the MODEL_REGISTRY environment variable to point to your OCI model registry
export MODEL_REGISTRY=myregistry.com

# If $MODEL_REGISTRY needs authentication, please login first
modctl login -u <username> -p <password> $MODEL_REGISTRY

# Generate a sample Modelfile, and edit the fields as needed
modctl modelfile generate $MODEL_PATH

# Build a model artifact from your model files
modctl build -t $MODEL_REGISTRY/mymodel:v1.0 $MODEL_PATH

# Push to an OCI registry
modctl push $MODEL_REGISTRY/mymodel:v1.0
```

### Step 5: Use Models in Kubernetes

Here's an example Kubernetes pod spec that mounts a model artifact using the model CSI driver. The model will be available under the `/model` directory inside the container:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: model-inference-pod
spec:
  containers:
    - name: inference-server
      image: ubuntu:24.04
      command: ["sleep", "infinity"]
      volumeMounts:
        - name: model-volume
          mountPath: /model
          readOnly: true
  volumes:
    - name: model-volume
      csi:
        driver: model.csi.modelpack.org
        volumeAttributes:
          modelRef: "myregistry.com/mymodel:v1.0"
```

This example shows how to mount a model artifact directly into a Kubernetes pod using the model CSI driver. The contents of the model are available within the `/model` directory within the running pod.

## Next Steps

1. **Explore the [full ModelPack specification](/specification/)** for technical implementation details
2. **Try more options of the [modctl tool](https://github.com/modelpack/modctl)** for additional hands-on experience
3. **Join the community** on [CNCF Slack #modelpack](https://cloud-native.slack.com/archives/C07T0V480LF)
4. **Contribute** to the ModelPack project - see our [contributing guidelines](https://github.com/modelpack/model-spec/blob/main/CONTRIBUTING.md)

## Additional Resources

- [ModelPack GitHub Repository](https://github.com/modelpack/model-spec)
- [OCI Image Specification](https://github.com/opencontainers/image-spec)
- [Harbor Project](https://goharbor.io/)
- [Dragonfly Project](https://d7y.io/)
- [CRI-O](https://cri-o.io/)
- [KitOps](https://kitops.ml/)
- [Hugging Face](https://huggingface.co/)

The ModelPack specification represents the next evolution in infrastructure standardization, bringing the benefits of containerization to AI model management. Start with the basics, explore the ecosystem, and join our growing community of contributors and users building the future of cloud-native AI.
