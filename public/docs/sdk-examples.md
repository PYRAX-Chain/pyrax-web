# PYRAX SDK & API Examples

Complete examples for using Crucible AI inference and Foundry ML training programmatically.

## Quick Start

### Get Your API Key

1. Connect your wallet at [pyrax.network/dashboard](https://pyrax.network/dashboard)
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key** and save it securely

### Base URL

```
https://api.pyrax.network/v1
```

---

## Crucible AI - Text Generation

### cURL

```bash
curl -X POST https://api.pyrax.network/v1/crucible/jobs \
  -H "Authorization: Bearer pyrax_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "model": "llama-3.1-70b",
    "prompt": "Explain quantum computing in simple terms",
    "maxTokens": 256,
    "temperature": 0.7
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('https://api.pyrax.network/v1/crucible/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pyrax_YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'text',
    model: 'llama-3.1-70b',
    prompt: 'Explain quantum computing in simple terms',
    maxTokens: 256,
    temperature: 0.7,
  }),
});

const { data } = await response.json();
console.log('Job ID:', data.jobId);

// Poll for completion
const pollJob = async (jobId: string) => {
  const res = await fetch(`https://api.pyrax.network/v1/crucible/jobs?wallet=YOUR_WALLET`, {
    headers: { 'Authorization': 'Bearer pyrax_YOUR_API_KEY' },
  });
  const { data } = await res.json();
  return data.jobs.find(j => j.id === jobId);
};

// Wait for completion
let job;
do {
  await new Promise(r => setTimeout(r, 2000));
  job = await pollJob(data.jobId);
} while (!['completed', 'failed'].includes(job.status));

console.log('Result:', job.output.text);
```

### Python

```python
import requests
import time

API_KEY = "pyrax_YOUR_API_KEY"
BASE_URL = "https://api.pyrax.network/v1"

# Submit text generation job
response = requests.post(
    f"{BASE_URL}/crucible/jobs",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "type": "text",
        "model": "llama-3.1-70b",
        "prompt": "Explain quantum computing in simple terms",
        "maxTokens": 256,
        "temperature": 0.7,
    },
)

job_id = response.json()["data"]["jobId"]
print(f"Job submitted: {job_id}")

# Poll for completion
while True:
    time.sleep(2)
    res = requests.get(
        f"{BASE_URL}/crucible/jobs?wallet=YOUR_WALLET",
        headers={"Authorization": f"Bearer {API_KEY}"},
    )
    jobs = res.json()["data"]["jobs"]
    job = next((j for j in jobs if j["id"] == job_id), None)
    
    if job and job["status"] in ["completed", "failed"]:
        break

if job["status"] == "completed":
    print("Result:", job["output"]["text"])
else:
    print("Error:", job.get("error"))
```

---

## Crucible AI - Image Generation

### cURL

```bash
curl -X POST https://api.pyrax.network/v1/crucible/jobs \
  -H "Authorization: Bearer pyrax_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "image",
    "model": "flux-schnell",
    "prompt": "A futuristic city at sunset, cyberpunk style",
    "negativePrompt": "blurry, low quality",
    "size": "1024x1024",
    "numImages": 1
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('https://api.pyrax.network/v1/crucible/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pyrax_YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'image',
    model: 'flux-schnell',
    prompt: 'A futuristic city at sunset, cyberpunk style',
    negativePrompt: 'blurry, low quality',
    size: '1024x1024',
    numImages: 1,
  }),
});

const { data } = await response.json();
// Poll for completion, then get image URL from job.output.images[0].url
```

---

## Crucible AI - Embeddings

### cURL

```bash
curl -X POST https://api.pyrax.network/v1/crucible/jobs \
  -H "Authorization: Bearer pyrax_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "embedding",
    "model": "bge-large",
    "prompt": "The quick brown fox jumps over the lazy dog"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "jobId": "clxyz...",
    "status": "pending",
    "model": "bge-large",
    "estimatedCost": 0.0001
  }
}
```

After completion:

```json
{
  "output": {
    "embedding": [0.123, -0.456, ...],
    "dimensions": 768
  }
}
```

---

## Foundry ML - Fine-Tuning

### Submit Training Job

```bash
curl -X POST https://api.pyrax.network/v1/foundry/jobs \
  -H "Authorization: Bearer pyrax_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "finetune",
    "baseModel": "llama-3-8b",
    "datasetUrl": "ipfs://QmYourDatasetHash",
    "config": {
      "epochs": 3,
      "batchSize": 4,
      "learningRate": "2e-5",
      "maxBudget": 100,
      "outputName": "my-custom-model"
    }
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('https://api.pyrax.network/v1/foundry/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pyrax_YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'finetune',
    baseModel: 'llama-3-8b',
    datasetUrl: 'ipfs://QmYourDatasetHash',
    config: {
      epochs: 3,
      batchSize: 4,
      learningRate: '2e-5',
      maxBudget: 100,
      outputName: 'my-custom-model',
    },
  }),
});

const { data } = await response.json();
console.log('Training job started:', data.jobId);
```

### Python

```python
import requests

response = requests.post(
    "https://api.pyrax.network/v1/foundry/jobs",
    headers={
        "Authorization": "Bearer pyrax_YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "type": "finetune",
        "baseModel": "llama-3-8b",
        "datasetUrl": "ipfs://QmYourDatasetHash",
        "config": {
            "epochs": 3,
            "batchSize": 4,
            "learningRate": "2e-5",
            "maxBudget": 100,
            "outputName": "my-custom-model",
        },
    },
)

print(response.json())
```

---

## API Key Management

### Create API Key

```bash
curl -X POST https://api.pyrax.network/v1/api-keys \
  -H "x-wallet-address: 0xYourWalletAddress" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Server",
    "permissions": ["crucible", "foundry"]
  }'
```

### List API Keys

```bash
curl https://api.pyrax.network/v1/api-keys \
  -H "x-wallet-address: 0xYourWalletAddress"
```

### Delete API Key

```bash
curl -X DELETE "https://api.pyrax.network/v1/api-keys?id=KEY_ID" \
  -H "x-wallet-address: 0xYourWalletAddress"
```

---

## Available Models

### Text Generation
| Model | Cost/1K tokens | Best For |
|-------|---------------|----------|
| llama-3.1-405b | 1.5 PYRX | Highest quality |
| llama-3.1-70b | 0.5 PYRX | Best balance |
| llama-3.1-8b | 0.1 PYRX | Fast responses |
| mixtral-8x7b | 0.25 PYRX | Best value |
| phi-3-mini | 0.03 PYRX | Fastest |

### Image Generation
| Model | Cost/image | Best For |
|-------|-----------|----------|
| flux-1.1-pro | 0.08 PYRX | Highest quality |
| flux-schnell | 0.015 PYRX | Fast generation |
| sdxl | 0.025 PYRX | Good balance |
| sd-turbo | 0.008 PYRX | Fastest |

### Embeddings
| Model | Cost/1K tokens | Best For |
|-------|---------------|----------|
| bge-large | 0.01 PYRX | RAG applications |
| e5-mistral-7b | 0.05 PYRX | Highest quality |
| nomic-embed | 0.008 PYRX | Fast embeddings |

---

## Error Handling

All API responses follow this format:

### Success
```json
{
  "success": true,
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad request (invalid parameters)
- `401` - Unauthorized (invalid or missing API key)
- `402` - Insufficient credits
- `429` - Rate limit exceeded
- `500` - Server error

---

## Rate Limits

| Tier | Requests/min | Requests/day | Concurrent Jobs |
|------|-------------|--------------|-----------------|
| Free | 100 | 10,000 | 50 |
| Starter | 500 | 50,000 | 200 |
| Pro | 2,000 | 500,000 | 1,000 |
| Enterprise | Custom | Custom | Custom |

---

## Support

- Documentation: [docs.pyrax.network](https://docs.pyrax.network)
- Discord: [discord.gg/pyrax](https://discord.gg/pyrax)
- Email: support@pyrax.network
