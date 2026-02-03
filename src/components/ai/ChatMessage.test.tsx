/**
 * Tests for ChatMessage markdown rendering
 * Run with: npx vitest run src/components/ai/ChatMessage.test.tsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Test the markdown rendering directly (same setup as ChatMessage)
function TestMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children }) => (
          <table data-testid="markdown-table">{children}</table>
        ),
        th: ({ children }) => <th data-testid="table-header">{children}</th>,
        td: ({ children }) => <td data-testid="table-cell">{children}</td>,
      }}
    >
      {content}
    </Markdown>
  );
}

describe('Markdown Table Rendering', () => {
  it('should render a simple markdown table', () => {
    const tableMarkdown = `
| Feature | Value |
| :------ | :---- |
| Price   | €94   |
| Color   | Gray  |
`;

    const { container } = render(<TestMarkdown content={tableMarkdown} />);

    // Check table element exists
    const table = screen.getByTestId('markdown-table');
    expect(table).toBeDefined();

    // Check headers
    const headers = screen.getAllByTestId('table-header');
    expect(headers).toHaveLength(2);
    expect(headers[0].textContent).toBe('Feature');
    expect(headers[1].textContent).toBe('Value');

    // Check cells
    const cells = screen.getAllByTestId('table-cell');
    expect(cells).toHaveLength(4);
    expect(cells[0].textContent).toBe('Price');
    expect(cells[1].textContent).toBe('€94');
  });

  it('should render comparison table like API response', () => {
    const comparisonTable = `Here's a comparison:

| Feature | Product A | Product B |
| :------ | :-------- | :-------- |
| **Price** | €94 | €94 |
| **Color** | Gray | Black |

Both products are great!`;

    const { container } = render(<TestMarkdown content={comparisonTable} />);

    const table = screen.getByTestId('markdown-table');
    expect(table).toBeDefined();

    // Should have 2 header columns (Feature, Product A, Product B)
    const headers = screen.getAllByTestId('table-header');
    expect(headers).toHaveLength(3);

    // Should have 6 data cells (2 rows × 3 columns)
    const cells = screen.getAllByTestId('table-cell');
    expect(cells).toHaveLength(6);
  });

  it('should render table with newlines in content', () => {
    // Simulating what comes from API with \n converted to actual newlines
    const content = "| Col1 | Col2 |\n| :--- | :--- |\n| A | B |";

    const { container } = render(<TestMarkdown content={content} />);

    const table = screen.getByTestId('markdown-table');
    expect(table).toBeDefined();
  });

  it('should NOT render table without remark-gfm', () => {
    const tableMarkdown = `| A | B |\n| - | - |\n| 1 | 2 |`;

    // Render WITHOUT remarkGfm
    const { container } = render(
      <Markdown>{tableMarkdown}</Markdown>
    );

    // Without GFM, table should NOT be rendered as <table>
    const table = container.querySelector('table');
    expect(table).toBeNull();
  });
});
