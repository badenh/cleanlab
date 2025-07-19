import fetch from 'node-fetch';

export interface TLMClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatOptions {
  messages: ChatMessage[];
  [key: string]: any;
}

export class TLMClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: TLMClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? 'https://api.cleanlab.ai';
  }

  private async request(path: string, payload: any) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Cleanlab API request failed with ${res.status}`);
    }
    return res.json();
  }

  async chat(options: ChatOptions) {
    return this.request('/tlm/chat', options);
  }

  async score(options: ChatOptions) {
    return this.request('/tlm/score', options);
  }

  async explain(options: ChatOptions) {
    return this.request('/tlm/explain', options);
  }
}

export default TLMClient;
