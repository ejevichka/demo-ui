/**
 * Tests for SSE Parser
 * Run with: npx vitest run src/lib/sseParser.test.ts
 */

import { describe, it, expect } from 'vitest';
import { createSSEParser } from './sseParser';

describe('SSE Parser', () => {
  describe('Basic parsing', () => {
    it('should parse complete SSE message with content field', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('data: {"content":"Hello"}\n');

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('Hello');
      expect(results[0].done).toBe(false);
    });

    it('should parse message field format', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('data: {"message":"Hello"}\n');

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('Hello');
    });

    it('should handle [DONE] signal', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('data: [DONE]\n');

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].content).toBeNull();
    });
  });

  describe('Buffering incomplete chunks', () => {
    it('should buffer incomplete JSON and parse when complete', () => {
      const parser = createSSEParser();

      // Send incomplete chunk
      const results1 = parser.processChunk('data: {"message":"Hel');
      expect(results1).toHaveLength(0); // Nothing parsed yet - incomplete

      // Complete the chunk
      const results2 = parser.processChunk('lo"}\n');
      expect(results2).toHaveLength(1);
      expect(results2[0].content).toBe('Hello');
    });

    it('should NOT leak incomplete JSON as text (the main bug fix)', () => {
      const parser = createSSEParser();

      // Simulate the bug scenario: incomplete JSON that looks like it could be text
      const results1 = parser.processChunk('data: {"result":{"answer":"Great ');
      expect(results1).toHaveLength(0); // Should NOT add raw JSON to output

      // Complete the JSON
      const results2 = parser.processChunk('choice!"}}\n');
      expect(results2).toHaveLength(1);
      expect(results2[0].fullAnswer).toBe('Great choice!');
      expect(results2[0].done).toBe(true);
    });
  });

  describe('result.answer handling', () => {
    it('should return fullAnswer from result.answer format', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('data: {"result":{"answer":"Final answer"}}\n');

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('Final answer');
      expect(results[0].content).toBeNull();
    });

    it('should handle streaming followed by final result.answer', () => {
      const parser = createSSEParser();

      // Streaming chunks
      const results1 = parser.processChunk('data: {"message":"Streaming "}\n');
      expect(results1[0].content).toBe('Streaming ');

      const results2 = parser.processChunk('data: {"message":"content..."}\n');
      expect(results2[0].content).toBe('content...');

      // Final answer (should replace streaming content)
      const results3 = parser.processChunk('data: {"result":{"answer":"Final authoritative answer"}}\n');
      expect(results3[0].done).toBe(true);
      expect(results3[0].fullAnswer).toBe('Final authoritative answer');
    });
  });

  describe('Multiple messages in one chunk', () => {
    it('should parse multiple complete messages in one chunk', () => {
      const parser = createSSEParser();
      const results = parser.processChunk(
        'data: {"message":"Hello"}\n' +
        'data: {"message":" World"}\n'
      );

      expect(results).toHaveLength(2);
      expect(results[0].content).toBe('Hello');
      expect(results[1].content).toBe(' World');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty lines', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('\n\ndata: {"content":"test"}\n\n');

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('test');
    });

    it('should handle SSE comments (lines starting with :)', () => {
      const parser = createSSEParser();
      const results = parser.processChunk(': this is a comment\ndata: {"content":"test"}\n');

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('test');
    });

    it('should flush remaining buffer content', () => {
      const parser = createSSEParser();

      // Add incomplete content
      parser.processChunk('data: {"message":"test"}');

      // Flush should process remaining
      const results = parser.flush();
      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('test');
    });

    it('should handle products in response', () => {
      const parser = createSSEParser();
      const results = parser.processChunk('data: {"content":"text","products":[{"id":"1"}]}\n');

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('text');
      expect(results[0].products).toEqual([{ id: '1' }]);
    });
  });

  describe('displayedProducts extraction', () => {
    it('should extract displayedProducts from result object', () => {
      const parser = createSSEParser();
      const products = [
        { id: '1', title: 'Product 1', price: 100, imageUrl: 'http://example.com/1.jpg' },
        { id: '2', title: 'Product 2', price: 200, imageUrl: 'http://example.com/2.jpg' },
      ];

      const results = parser.processChunk(
        `data: {"result":{"answer":"Here are products","displayedProducts":${JSON.stringify(products)}}}\n`
      );

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('Here are products');
      expect(results[0].products).toHaveLength(2);
      expect(results[0].products![0]).toEqual(products[0]);
    });

    it('should prioritize displayedProducts over root-level products', () => {
      const parser = createSSEParser();
      const displayedProducts = [{ id: 'displayed', title: 'From displayedProducts' }];
      const rootProducts = [{ id: 'root', title: 'From root' }];

      const results = parser.processChunk(
        `data: {"result":{"answer":"Test","displayedProducts":${JSON.stringify(displayedProducts)}},"products":${JSON.stringify(rootProducts)}}\n`
      );

      expect(results[0].products).toHaveLength(1);
      expect(results[0].products![0].id).toBe('displayed');
    });
  });

  describe('displayedProducts from /generateAnswer — Krups industry', () => {
    it('should extract displayedProducts with Krups product fields', () => {
      const parser = createSSEParser();
      const krupsProducts = [
        {
          id: 'krups-001',
          title: 'Krups EA8108',
          price: 249.99,
          oldPrice: 299.99,
          imageUrl: 'https://example.com/krups-ea8108.jpg',
          description: 'Automatic espresso machine',
          availability: true,
          category: 'coffee-machines',
        },
        {
          id: 'krups-002',
          title: 'Krups Evidence',
          price: 399.00,
          priceOld: 449.00,
          imageUrl: 'https://example.com/krups-evidence.jpg',
          description: 'Premium espresso machine',
          availability: true,
          category: 'coffee-machines',
        },
      ];

      const sseData = JSON.stringify({
        result: {
          answer: 'Here are the best Krups coffee machines for you.',
          messageId: '1',
          displayedProducts: krupsProducts,
        },
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('Here are the best Krups coffee machines for you.');
      expect(results[0].products).toHaveLength(2);
      expect(results[0].products![0].id).toBe('krups-001');
      expect(results[0].products![0].title).toBe('Krups EA8108');
      expect(results[0].products![0].price).toBe(249.99);
      expect(results[0].products![0].imageUrl).toBe('https://example.com/krups-ea8108.jpg');
      expect(results[0].products![1].id).toBe('krups-002');
      // Content should be null (fullAnswer replaces streaming)
      expect(results[0].content).toBeNull();
    });

    it('should handle Krups streaming + final result with displayedProducts', () => {
      const parser = createSSEParser();

      // Streaming chunks
      const r1 = parser.processChunk('data: {"message":"Looking at "}\n');
      expect(r1[0].content).toBe('Looking at ');
      expect(r1[0].products).toBeUndefined();

      const r2 = parser.processChunk('data: {"message":"coffee machines..."}\n');
      expect(r2[0].content).toBe('coffee machines...');

      // Final result with displayedProducts
      const finalData = JSON.stringify({
        result: {
          answer: 'Here are top Krups machines.',
          displayedProducts: [
            { id: 'k1', title: 'Krups EA8108', price: 249, imageUrl: 'https://example.com/k1.jpg' },
          ],
        },
      });
      const r3 = parser.processChunk(`data: ${finalData}\n`);

      expect(r3).toHaveLength(1);
      expect(r3[0].done).toBe(true);
      expect(r3[0].fullAnswer).toBe('Here are top Krups machines.');
      expect(r3[0].products).toHaveLength(1);
      expect(r3[0].products![0].id).toBe('k1');
    });
  });

  describe('displayedProducts from /generateAnswer — Beauty industry', () => {
    it('should extract displayedProducts with Beauty product fields', () => {
      const parser = createSSEParser();
      const beautyProducts = [
        {
          id: 'beauty-001',
          title: 'L\'Oréal Revitalift Serum',
          price: 19.99,
          oldPrice: 24.99,
          imageUrl: 'https://example.com/loreal-serum.jpg',
          description: 'Anti-aging hyaluronic acid serum',
          availability: true,
          category: 'skincare',
          url: 'https://shop.example.com/loreal-serum',
        },
        {
          id: 'beauty-002',
          title: 'Maybelline Mascara',
          price: 12.50,
          imageUrl: 'https://example.com/mascara.jpg',
          description: 'Volume express mascara',
          availability: true,
          category: 'makeup',
        },
      ];

      const sseData = JSON.stringify({
        result: {
          answer: 'These beauty products match your needs.',
          messageId: '2',
          displayedProducts: beautyProducts,
        },
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('These beauty products match your needs.');
      expect(results[0].products).toHaveLength(2);
      expect(results[0].products![0].id).toBe('beauty-001');
      expect(results[0].products![0].title).toBe('L\'Oréal Revitalift Serum');
      expect(results[0].products![1].id).toBe('beauty-002');
      expect(results[0].content).toBeNull();
    });

    it('should handle Beauty streaming + final result with displayedProducts', () => {
      const parser = createSSEParser();

      // Streaming
      parser.processChunk('data: {"message":"Let me find "}\n');
      parser.processChunk('data: {"message":"skincare products..."}\n');

      // Final with displayedProducts
      const finalData = JSON.stringify({
        result: {
          answer: 'Here are recommended skincare products.',
          displayedProducts: [
            { id: 'b1', title: 'Face Cream', price: 15, imageUrl: 'https://example.com/cream.jpg' },
            { id: 'b2', title: 'Eye Serum', price: 22, imageUrl: 'https://example.com/serum.jpg' },
          ],
        },
      });
      const r = parser.processChunk(`data: ${finalData}\n`);

      expect(r).toHaveLength(1);
      expect(r[0].done).toBe(true);
      expect(r[0].products).toHaveLength(2);
      expect(r[0].products![0].id).toBe('b1');
      expect(r[0].products![1].id).toBe('b2');
    });
  });

  describe('displayedProducts from /generateAnswer — Bluemarket industry', () => {
    it('should extract displayedProducts with Bluemarket product fields', () => {
      const parser = createSSEParser();
      const bluemarketProducts = [
        {
          id: 'blue-001',
          title: 'Running Shoes Pro',
          price: 89.99,
          oldPrice: 119.99,
          imageUrl: 'https://example.com/shoes.jpg',
          category: 'sports',
        },
        {
          id: 'blue-002',
          title: 'Fitness Tracker',
          price: 49.99,
          imageUrl: 'https://example.com/tracker.jpg',
          category: 'electronics',
        },
      ];

      const sseData = JSON.stringify({
        result: {
          answer: 'Great choices for your running setup!',
          messageId: '3',
          displayedProducts: bluemarketProducts,
        },
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('Great choices for your running setup!');
      expect(results[0].products).toHaveLength(2);
      expect(results[0].products![0].id).toBe('blue-001');
      expect(results[0].products![0].price).toBe(89.99);
      expect(results[0].products![0].oldPrice).toBe(119.99);
      expect(results[0].products![1].id).toBe('blue-002');
      expect(results[0].content).toBeNull();
    });

    it('should handle Bluemarket streaming + final result with displayedProducts', () => {
      const parser = createSSEParser();

      // Streaming
      parser.processChunk('data: {"message":"Checking "}\n');
      parser.processChunk('data: {"message":"available products..."}\n');

      // Final with displayedProducts
      const finalData = JSON.stringify({
        result: {
          answer: 'Here are the best options for you.',
          displayedProducts: [
            { id: 'bm1', title: 'Sport Shoes', price: 79, imageUrl: 'https://example.com/sport.jpg' },
          ],
        },
      });
      const r = parser.processChunk(`data: ${finalData}\n`);

      expect(r).toHaveLength(1);
      expect(r[0].done).toBe(true);
      expect(r[0].products).toHaveLength(1);
      expect(r[0].products![0].id).toBe('bm1');
    });
  });

  describe('No displayedProducts — fallback scenarios', () => {
    it('should return no products when result has no displayedProducts', () => {
      const parser = createSSEParser();
      const sseData = JSON.stringify({
        result: {
          answer: 'I can help you with that question.',
          messageId: '4',
        },
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].fullAnswer).toBe('I can help you with that question.');
      expect(results[0].products).toBeUndefined();
    });

    it('should return no products when displayedProducts is empty array', () => {
      const parser = createSSEParser();
      const sseData = JSON.stringify({
        result: {
          answer: 'No products found for your query.',
          displayedProducts: [],
        },
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].done).toBe(true);
      expect(results[0].products).toHaveLength(0);
    });

    it('should use root-level products as fallback when no displayedProducts', () => {
      const parser = createSSEParser();
      const sseData = JSON.stringify({
        result: {
          answer: 'Answer without displayedProducts.',
        },
        products: [{ id: 'root-1', title: 'Root Product' }],
      });

      const results = parser.processChunk(`data: ${sseData}\n`);

      expect(results).toHaveLength(1);
      expect(results[0].products).toHaveLength(1);
      expect(results[0].products![0].id).toBe('root-1');
    });

    it('should handle displayedProducts split across chunks', () => {
      const parser = createSSEParser();
      const products = [
        { id: 'split-1', title: 'Product 1', price: 100, imageUrl: 'https://example.com/1.jpg' },
        { id: 'split-2', title: 'Product 2', price: 200, imageUrl: 'https://example.com/2.jpg' },
      ];
      const fullData = `data: {"result":{"answer":"Split test","displayedProducts":${JSON.stringify(products)}}}`;

      // Split in the middle of displayedProducts
      const splitAt = Math.floor(fullData.length / 2);
      const chunk1 = fullData.substring(0, splitAt);
      const chunk2 = fullData.substring(splitAt) + '\n';

      const r1 = parser.processChunk(chunk1);
      expect(r1).toHaveLength(0); // Buffered, not parsed yet

      const r2 = parser.processChunk(chunk2);
      expect(r2).toHaveLength(1);
      expect(r2[0].done).toBe(true);
      expect(r2[0].fullAnswer).toBe('Split test');
      expect(r2[0].products).toHaveLength(2);
      expect(r2[0].products![0].id).toBe('split-1');
      expect(r2[0].products![1].id).toBe('split-2');
    });
  });

  describe('Bug reproduction: JSON leak scenario', () => {
    it('should NOT leak JSON when chunk splits in middle of JSON object', () => {
      const parser = createSSEParser();
      let accumulated = '';

      // Simulate real-world scenario from the bug report
      // Chunk 1: Complete message + start of another
      const results1 = parser.processChunk(
        'data: {"message":"This set offers a solid foundation."}\n' +
        'data: {"result":{"answer":"Great'
      );

      for (const r of results1) {
        if (r.content) accumulated += r.content;
      }
      expect(accumulated).toBe('This set offers a solid foundation.');

      // Chunk 2: Rest of the JSON
      const results2 = parser.processChunk(' choice to start running!"}}\n');

      expect(results2).toHaveLength(1);
      expect(results2[0].fullAnswer).toBe('Great choice to start running!');
      expect(results2[0].done).toBe(true);

      // The accumulated text should NOT contain raw JSON
      expect(accumulated).not.toContain('{');
      expect(accumulated).not.toContain('"result"');
    });
  });
});
