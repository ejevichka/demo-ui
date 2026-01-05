import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { ChatMessage as ChatMessageType, Product } from '@/types';
import { useTheme } from '@/hooks/useTheme';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { theme } = useTheme();
  const isUser = message.role === 'user';
  const isDark = theme.isDark;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[70%] px-4 py-3 rounded-2xl rounded-tr-md text-[14px] leading-relaxed"
          style={{
            backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
            color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant message
  const showLoader = message.isStreaming && !message.content;

  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] px-5 py-4 rounded-2xl rounded-tl-md"
        style={{
          backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
          color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: isDark ? '1px solid var(--neutral-700)' : 'none',
        }}
      >
        <div className="text-[14px] leading-[1.7]">
          {showLoader ? (
            <TypingIndicator />
          ) : (
            <>
              <FormattedMessage content={message.content} isDark={isDark} products={message.products} />
              {message.isStreaming && <StreamingCursor />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StreamingCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[18px] ml-0.5 rounded-full animate-pulse"
      style={{ backgroundColor: 'var(--primary)' }}
    />
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '0ms',
          animationDuration: '600ms',
        }}
      />
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '150ms',
          animationDuration: '600ms',
        }}
      />
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '300ms',
          animationDuration: '600ms',
        }}
      />
    </div>
  );
}

// Product card component - minimal version (image + title only)
interface ProductCardProps {
  name: string;
  url: string;
  price?: number;
  oldPrice?: number;
  imageUrl?: string;
  isDark: boolean;
  description?: string;
  availability?: boolean;
}

function ProductCard({ name, url, price, oldPrice, imageUrl, isDark, description, availability }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPlaceholderImage = () => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('капсульн')) {
      return 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop';
    }
    if (nameLower.includes('автоматическ')) {
      return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop';
  };

  const displayImage = imageUrl || getPlaceholderImage();

  return (
    <>
      <div
        className="rounded-xl overflow-hidden flex-shrink-0"
        style={{
          backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-50)',
          border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-200)'}`,
          width: '140px',
        }}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getPlaceholderImage();
            }}
          />
        </div>
        <div className="p-2">
          <h4
            className="text-[11px] font-medium leading-tight line-clamp-2 mb-2"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {name}
          </h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-1.5 rounded-lg text-[11px] font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
            }}
          >
            Details
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          name={name}
          url={url}
          price={price}
          oldPrice={oldPrice}
          imageUrl={displayImage}
          isDark={isDark}
          description={description}
          availability={availability}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

// Product detail modal
interface ProductModalProps {
  name: string;
  url: string;
  price?: number;
  oldPrice?: number;
  imageUrl: string;
  isDark: boolean;
  description?: string;
  availability?: boolean;
  onClose: () => void;
}

function ProductModal({ name, url: _url, price, oldPrice, imageUrl, isDark, description, availability, onClose }: ProductModalProps) {
  const hasDiscount = oldPrice && price && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;

  // Use createPortal to render modal at document.body level for proper centering
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      data-product-modal="true"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal content */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
            color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {hasDiscount && (
            <div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-lg text-[14px] font-semibold text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              -{discountPercent}%
            </div>
          )}
          {/* Availability badge */}
          {availability !== undefined && (
            <div
              className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-[12px] font-medium"
              style={{
                backgroundColor: availability ? '#22c55e' : '#ef4444',
                color: '#FFFFFF',
              }}
            >
              {availability ? 'В наличии' : 'Нет в наличии'}
            </div>
          )}
        </div>

        {/* Scrollable Details */}
        <div className="p-5 overflow-y-auto flex-1">
          <h3
            className="text-[18px] font-semibold leading-tight mb-3"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {name}
          </h3>

          {price && (
            <div className="flex items-baseline gap-3 mb-4">
              {hasDiscount && (
                <span
                  className="text-[14px] line-through"
                  style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                >
                  {oldPrice!.toLocaleString('ru-RU')} ₽
                </span>
              )}
              <span
                className="text-[24px] font-bold"
                style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
              >
                {price.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-4">
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-600)' }}
              >
                {description.length > 500 ? `${description.slice(0, 500)}...` : description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

interface ParsedProduct {
  name: string;
  url: string;
  price?: number;
  fullMatch: string;
}

function parseProductLinks(text: string): ParsedProduct[] {
  const products: ParsedProduct[] = [];

  // Match product links to krups.ru - with or without price
  // Format 1: **[Name](url)** — 59999 ₽
  // Format 2: [Name](url) — 59999 ₽
  // Format 3: **[Name](url)** (no price)
  // Format 4: [Name](url) (no price, but only krups.ru product links)
  const productRegex = /\*?\*?\[([^\]]+)\]\((https:\/\/krups\.ru\/product[^\)]+)\)\*?\*?(?:\s*[—\-–]\s*([\d\s]+)\s*₽)?/g;

  let match;
  while ((match = productRegex.exec(text)) !== null) {
    const name = match[1].trim();
    const url = match[2].trim();
    const priceStr = match[3]?.replace(/\s/g, '');
    const price = priceStr ? parseInt(priceStr, 10) : undefined;

    products.push({
      name,
      url,
      price: price && !isNaN(price) ? price : undefined,
      fullMatch: match[0]
    });
  }

  return products;
}

interface FormattedMessageProps {
  content: string;
  isDark: boolean;
  products?: Product[];
}

// Extract only intro text before products (removes all product descriptions)
function extractIntroText(content: string): string {
  // Patterns that indicate start of product section
  const productSectionPatterns = [
    /(?:^|\n)\s*(?:1\.|•|-|\*)\s*\*?\*?\[/m, // Numbered or bullet list with links
    /(?:^|\n)\s*\*?\*?\[.+\]\(http/m, // Markdown links
    /(?:^|\n)\s*(?:Here are|I found|Based on|Вот|Нашел|На основе)/im, // Intro phrases before products
  ];

  let cutoffIndex = content.length;

  for (const pattern of productSectionPatterns) {
    const match = content.match(pattern);
    if (match && match.index !== undefined && match.index < cutoffIndex) {
      cutoffIndex = match.index;
    }
  }

  // Get text before products
  let introText = content.slice(0, cutoffIndex).trim();

  // Remove trailing incomplete sentences or colons
  introText = introText.replace(/[:]\s*$/, '').trim();

  // If intro is too short or looks like just a header, return empty
  if (introText.length < 10) {
    return '';
  }

  return introText;
}

function FormattedMessage({ content, isDark, products }: FormattedMessageProps) {
  // If we have products from API, show them directly with minimal text
  if (products && products.length > 0) {
    const introText = extractIntroText(content);

    return (
      <>
        {introText && (
          <div className="mb-3">
            <FormattedTextContent content={introText} isDark={isDark} />
          </div>
        )}
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              url={`https://krups.ru/product/${product.id}`}
              price={product.newPrice}
              oldPrice={product.oldPrice}
              imageUrl={product.image}
              isDark={isDark}
              description={product.description}
              availability={product.availability}
            />
          ))}
        </div>
      </>
    );
  }

  // No products from API - check for parsed product links in text
  const parsedProducts = parseProductLinks(content);

  if (parsedProducts.length === 0) {
    // No products at all - just render text
    return <FormattedTextContent content={content} isDark={isDark} />;
  }

  // Has product links in text - extract intro and show cards
  const introText = extractIntroText(content);

  return (
    <>
      {introText && (
        <div className="mb-3">
          <FormattedTextContent content={introText} isDark={isDark} />
        </div>
      )}
      <div className="flex flex-row gap-3 overflow-x-auto pb-2 -mx-2 px-2">
        {parsedProducts.map((p, j) => (
          <ProductCard
            key={j}
            name={p.name}
            url={p.url}
            price={p.price}
            isDark={isDark}
          />
        ))}
      </div>
    </>
  );
}

function FormattedTextContent({ content, isDark }: { content: string; isDark: boolean }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this is the start of a table (line starts with |)
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        elements.push(
          <MarkdownTable key={`table-${i}`} lines={tableLines} isDark={isDark} />
        );
      }
      continue;
    }

    // Regular line
    elements.push(
      <span key={i}>
        <FormattedLine line={line} isDark={isDark} />
        {i < lines.length - 1 && <br />}
      </span>
    );
    i++;
  }

  return <>{elements}</>;
}

// Markdown table renderer
function MarkdownTable({ lines, isDark }: { lines: string[]; isDark: boolean }) {
  // Parse table rows
  const parseRow = (line: string): string[] => {
    return line
      .split('|')
      .slice(1, -1) // Remove empty first and last elements
      .map(cell => cell.trim());
  };

  // First line is header
  const headerCells = parseRow(lines[0]);

  // Second line is separator (skip it)
  // Remaining lines are data rows
  const dataRows = lines.slice(2).map(parseRow);

  return (
    <div className="overflow-x-auto my-3 -mx-2">
      <table
        className="w-full text-[12px] border-collapse"
        style={{
          backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-50)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-100)',
            }}
          >
            {headerCells.map((cell, idx) => (
              <th
                key={idx}
                className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                style={{
                  color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                  borderBottom: `1px solid ${isDark ? 'var(--neutral-500)' : 'var(--neutral-200)'}`,
                }}
              >
                <FormattedText text={cell.replace(/\*\*/g, '')} isDark={isDark} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                backgroundColor: rowIdx % 2 === 0
                  ? (isDark ? 'var(--neutral-700)' : 'var(--neutral-50)')
                  : (isDark ? 'var(--neutral-750)' : '#FFFFFF'),
              }}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-3 py-2"
                  style={{
                    color: isDark ? 'var(--neutral-200)' : 'var(--neutral-700)',
                    borderBottom: rowIdx < dataRows.length - 1
                      ? `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-100)'}`
                      : 'none',
                  }}
                >
                  <FormattedText text={cell.replace(/\*\*/g, '')} isDark={isDark} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface FormattedLineProps {
  line: string;
  isDark: boolean;
}

function FormattedLine({ line, isDark }: FormattedLineProps) {
  if (!line.trim()) return null;

  if (line.match(/^[\s]*[-*•]\s/)) {
    const indent = line.match(/^(\s*)/)?.[1].length || 0;
    const text = line.replace(/^[\s]*[-*•]\s+/, '');
    return (
      <span className="flex gap-2 my-1" style={{ marginLeft: indent > 0 ? '16px' : 0 }}>
        <span style={{ color: 'var(--primary)' }}>•</span>
        <span className="flex-1">
          <FormattedText text={text} isDark={isDark} />
        </span>
      </span>
    );
  }

  if (line.match(/^-{3,}$/)) {
    return (
      <hr
        className="my-3 border-0 h-px"
        style={{ backgroundColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-200)' }}
      />
    );
  }

  return <FormattedText text={line} isDark={isDark} />;
}

interface FormattedTextProps {
  text: string;
  isDark: boolean;
}

function FormattedText({ text, isDark }: FormattedTextProps) {
  const elements: React.ReactNode[] = [];
  const regex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
    }

    const matchText = match[0];

    if (matchText.startsWith('***') && matchText.endsWith('***')) {
      elements.push(
        <strong key={match.index} className="font-semibold italic">
          {matchText.slice(3, -3)}
        </strong>
      );
    } else if (matchText.startsWith('**') && matchText.endsWith('**')) {
      elements.push(
        <strong
          key={match.index}
          className="font-semibold"
          style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
        >
          {matchText.slice(2, -2)}
        </strong>
      );
    } else if (matchText.startsWith('*') && matchText.endsWith('*')) {
      elements.push(
        <em key={match.index} className="italic">
          {matchText.slice(1, -1)}
        </em>
      );
    } else if (matchText.startsWith('[')) {
      const linkMatch = matchText.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        elements.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70 transition-opacity"
            style={{ color: 'var(--primary)' }}
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = match.index + matchText.length;
  }

  if (lastIndex < text.length) {
    elements.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
  }

  return <>{elements.length > 0 ? elements : text}</>;
}
