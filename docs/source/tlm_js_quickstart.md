# Trusted Language Model JS Quickstart

This page shows how to call Cleanlab TLM from JavaScript using the wrapper located in `js/cleanlab-tlm`.

```bash
npm install cleanlab-tlm-js
```

```ts
import { TLMClient } from 'cleanlab-tlm-js';

const tlm = new TLMClient({ apiKey: 'YOUR_API_KEY' });
const res = await tlm.chat({
  messages: [{ role: 'user', content: 'Is 9.11 less than 9.9' }]
});

console.log(res.response);
console.log('score:', res.score);
```

For Next.js apps on Vercel you can stream responses via the Vercel AI SDK as follows:

```ts
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
