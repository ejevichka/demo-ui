import type { ChatRequest, ChatMessage, Product } from '@/types';
import { generateId } from './utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullMessage: string, products?: Product[]) => void;
  onSuggestionsReceived?: (suggestions: string[]) => void;
  onError: (error: Error) => void;
}

export async function sendChatMessage(
  request: ChatRequest,
  callbacks: StreamCallbacks
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let fullMessage = '';
    let products: Product[] | undefined;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          if (data === '[DONE]') {
            callbacks.onComplete(fullMessage, products);
            return;
          }

          try {
            const parsed = JSON.parse(data);

            if (parsed.content) {
              fullMessage += parsed.content;
              callbacks.onChunk(parsed.content);
            }

            if (parsed.products) {
              products = parsed.products;
            }
          } catch {
            // Not JSON, treat as plain text chunk
            fullMessage += data;
            callbacks.onChunk(data);
          }
        }
      }
    }

    callbacks.onComplete(fullMessage, products);
  } catch (error) {
    callbacks.onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}

// Mock implementation for demo without backend
export async function sendChatMessageMock(
  request: ChatRequest,
  callbacks: StreamCallbacks
): Promise<void> {
  const mockResponse = getMockResponse(request.message);

  // Simulate streaming with delays
  const words = mockResponse.message.split(' ');
  let fullMessage = '';

  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
    const chunk = (i === 0 ? '' : ' ') + words[i];
    fullMessage += chunk;
    callbacks.onChunk(chunk);
  }

  callbacks.onComplete(fullMessage, mockResponse.products);
}

function getMockResponse(message: string): { message: string; products?: Product[] } {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('coffee') || lowerMessage.includes('machine')) {
    return {
      message: `I'll help you choose a coffee machine for your home. Based on your needs, I've selected automatic coffee machines that stand out for ease of use and high quality coffee preparation.

**KRUPS Essential EA810870** - This model is an excellent choice for home use thanks to its versatility and ease of operation. It features mechanical controls that make it intuitively understandable even for those just getting started with automatic coffee machines.

Key features:
- Power: 1450W
- Cappuccino preparation: Manual
- Key advantage: Manual grind adjustment (3 levels) for taste customization
- Price: $319.99 (discounted)

The built-in cappuccinatore allows you to easily prepare delicious creamy cappuccino.`,
      products: [
        {
          id: 'krups-1',
          title: 'KRUPS Essential EA810870',
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
          oldPrice: 449.99,
          newPrice: 319.99,
          currency: '$',
          discount: '-29%',
        },
      ],
    };
  }

  return {
    message: `Thank you for your question! I'm here to help you find the best products for your needs. Could you tell me more about what you're looking for? For example:

- What's your budget range?
- Any specific features you need?
- Is this for personal use or as a gift?

I'll provide personalized recommendations based on your preferences.`,
  };
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: generateId(),
    role: 'user',
    content,
    timestamp: new Date(),
  };
}

export function createAssistantMessage(content: string = '', isStreaming: boolean = false): ChatMessage {
  return {
    id: generateId(),
    role: 'assistant',
    content,
    timestamp: new Date(),
    isStreaming,
  };
}
