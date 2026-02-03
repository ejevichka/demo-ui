/**
 * SSE (Server-Sent Events) Parser with proper buffering
 *
 * Fixes the issue where incomplete JSON chunks get added to the message
 * as raw text instead of being properly parsed.
 */

export interface SSEParseResult {
  /** Extracted text content to append to message */
  content: string | null;
  /** Whether stream is complete */
  done: boolean;
  /** Full answer if provided in result.answer format */
  fullAnswer: string | null;
  /** Products array if provided in the response */
  products?: unknown[];
}

/**
 * Creates an SSE parser with internal buffer for handling incomplete chunks
 */
export function createSSEParser() {
  let buffer = '';

  /**
   * Process incoming chunk data and extract complete SSE messages
   * @param chunk Raw chunk from the stream
   * @returns Array of parse results for each complete message
   */
  function processChunk(chunk: string): SSEParseResult[] {
    buffer += chunk;
    const results: SSEParseResult[] = [];

    // Process complete lines only (ending with \n)
    // SSE messages are separated by \n, and a message can span multiple lines
    // but each "data:" line should be complete before processing
    const lines = buffer.split('\n');

    // Keep the last incomplete line in the buffer
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith(':')) {
        continue;
      }

      // Process SSE data lines
      if (trimmedLine.startsWith('data:')) {
        // Handle both "data: value" and "data:value" formats
        const data = trimmedLine.startsWith('data: ')
          ? trimmedLine.slice(6)
          : trimmedLine.slice(5);

        const result = parseSSEData(data.trim());
        if (result) {
          results.push(result);
        }
      }
    }

    return results;
  }

  /**
   * Flush any remaining buffer content (call when stream ends)
   */
  function flush(): SSEParseResult[] {
    if (!buffer.trim()) {
      return [];
    }

    const results: SSEParseResult[] = [];
    const trimmedBuffer = buffer.trim();

    if (trimmedBuffer.startsWith('data:')) {
      const data = trimmedBuffer.startsWith('data: ')
        ? trimmedBuffer.slice(6)
        : trimmedBuffer.slice(5);

      const result = parseSSEData(data.trim());
      if (result) {
        results.push(result);
      }
    }

    buffer = '';
    return results;
  }

  return { processChunk, flush };
}

/**
 * Parse SSE data field and extract content
 */
function parseSSEData(data: string): SSEParseResult | null {
  // Handle [DONE] signal
  if (data === '[DONE]') {
    return { content: null, done: true, fullAnswer: null };
  }

  // Skip empty data
  if (!data) {
    return null;
  }

  // Try to parse as JSON
  try {
    const parsed = JSON.parse(data);
    return extractContent(parsed);
  } catch {
    // JSON parse failed - this could be:
    // 1. Incomplete JSON (shouldn't happen with proper buffering)
    // 2. Plain text content (some APIs send raw text)

    // Check if it looks like incomplete JSON
    if (looksLikeIncompleteJSON(data)) {
      // Don't add incomplete JSON as text - this was the bug!
      console.warn('[SSE Parser] Discarding incomplete JSON:', data.substring(0, 50));
      return null;
    }

    // It's probably plain text content
    return { content: data, done: false, fullAnswer: null };
  }
}

/**
 * Extract content from parsed JSON based on different API response formats
 */
function extractContent(parsed: Record<string, unknown>): SSEParseResult | null {
  // Extract products if present (can come with any message type)
  const products = Array.isArray(parsed.products) ? parsed.products : undefined;

  // Format 1: {"message": "chunk"} - streaming chunks
  if (typeof parsed.message === 'string') {
    return { content: parsed.message, done: false, fullAnswer: null, products };
  }

  // Format 2: {"type": "content", "text": "chunk"}
  if (parsed.type === 'content' && typeof parsed.text === 'string') {
    return { content: parsed.text, done: false, fullAnswer: null, products };
  }

  // Format 3: {"content": "chunk"}
  if (typeof parsed.content === 'string') {
    return { content: parsed.content, done: false, fullAnswer: null, products };
  }

  // Format 4: {"result": {"answer": "full answer"}} - final complete response
  const result = parsed.result as Record<string, unknown> | undefined;
  if (result && typeof result.answer === 'string') {
    return { content: null, done: true, fullAnswer: result.answer, products };
  }

  // Format 5: {"type": "done"} - stream end signal
  if (parsed.type === 'done') {
    return { content: null, done: true, fullAnswer: null, products };
  }

  // Format 6: Only products without content (edge case)
  if (products) {
    return { content: null, done: false, fullAnswer: null, products };
  }

  // Unhandled format - log for debugging but don't crash
  console.warn('[SSE Parser] Unhandled JSON format:', JSON.stringify(parsed).substring(0, 100));
  return null;
}

/**
 * Check if string looks like incomplete JSON
 */
function looksLikeIncompleteJSON(data: string): boolean {
  const trimmed = data.trim();

  // Starts with { or [ but doesn't have matching closing bracket
  if (trimmed.startsWith('{')) {
    const openBraces = (trimmed.match(/{/g) || []).length;
    const closeBraces = (trimmed.match(/}/g) || []).length;
    return openBraces > closeBraces;
  }

  if (trimmed.startsWith('[')) {
    const openBrackets = (trimmed.match(/\[/g) || []).length;
    const closeBrackets = (trimmed.match(/]/g) || []).length;
    return openBrackets > closeBrackets;
  }

  // Starts with quote but doesn't end with quote (incomplete string)
  if (trimmed.startsWith('"') && !trimmed.endsWith('"')) {
    return true;
  }

  return false;
}

/**
 * Helper type for stream callbacks
 */
export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullMessage: string, products?: unknown[]) => void;
  onSuggestionsReceived?: (suggestions: string[]) => void;
  onError: (error: Error) => void;
}

/**
 * Process a ReadableStream with SSE parsing
 * This is a higher-level helper that handles the common streaming pattern
 */
export async function processSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  callbacks: {
    onChunk: (content: string) => void;
    onComplete: (fullMessage: string) => void;
  }
): Promise<void> {
  const decoder = new TextDecoder();
  const parser = createSSEParser();
  let fullMessage = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      // Process any remaining buffered content
      const results = parser.flush();
      for (const result of results) {
        if (result.content) {
          fullMessage += result.content;
          callbacks.onChunk(result.content);
        }
        // result.answer is the authoritative final version - always use it
        if (result.fullAnswer) {
          fullMessage = result.fullAnswer;
        }
      }
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    const results = parser.processChunk(chunk);

    for (const result of results) {
      if (result.done) {
        // result.answer is the authoritative final version - always use it
        if (result.fullAnswer) {
          fullMessage = result.fullAnswer;
        }
        callbacks.onComplete(fullMessage);
        return;
      }

      if (result.content) {
        fullMessage += result.content;
        callbacks.onChunk(result.content);
      }
    }
  }

  callbacks.onComplete(fullMessage);
}
