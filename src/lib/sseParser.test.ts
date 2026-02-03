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
