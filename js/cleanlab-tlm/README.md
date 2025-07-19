# Cleanlab Trusted Language Model JavaScript SDK

This package provides a simple JavaScript/TypeScript wrapper for the **Cleanlab Trusted Language Model (TLM) API**.
It mirrors the functionality of the official Python client so you can easily call TLM from Node.js or browser environments.

## Installation

```bash
npm install cleanlab-tlm-js
```

## Quickstart

```ts
import { TLMClient } from 'cleanlab-tlm-js';

const tlm = new TLMClient({ apiKey: process.env.CLEANLAB_API_KEY! });

const result = await tlm.chat({
  messages: [
    { role: 'user', content: 'Is 9.11 less than 9.9' }
  ]
});

console.log(result.response);
console.log('Trust score:', result.score);
```

## Next.js / Vercel AI SDK Example

```ts
// pages/api/chat.ts
import { StreamingTextResponse } from 'ai';
import { TLMClient } from 'cleanlab-tlm-js';

export const runtime = 'edge';

const tlm = new TLMClient({ apiKey: process.env.CLEANLAB_API_KEY! });

export default async function handler(req: Request) {
  const { messages } = await req.json();
  const stream = await tlm.chat({ messages, stream: true });
  return new StreamingTextResponse(stream);
}
```

This example shows how to integrate Cleanlab TLM with the [Vercel AI SDK](https://sdk.vercel.ai) in a Next.js route handler.

See the official Cleanlab documentation for all available parameters and endpoints.
