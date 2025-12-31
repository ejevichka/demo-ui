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
          <FormattedMessage content={message.content} isDark={isDark} products={message.products} />
          {message.isStreaming && <StreamingCursor />}
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

// Product card component
interface ProductCardProps {
  name: string;
  url: string;
  price?: number;
  oldPrice?: number;
  imageUrl?: string;
  isDark: boolean;
}

function ProductCard({ name, url, price, oldPrice, imageUrl, isDark }: ProductCardProps) {
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
  const hasDiscount = oldPrice && price && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg flex-shrink-0"
      style={{
        backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-50)',
        border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-200)'}`,
        width: '180px',
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
        {hasDiscount && (
          <div
            className="absolute top-2 left-2 px-2 py-1 rounded-md text-[12px] font-semibold text-white"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            -{discountPercent}%
          </div>
        )}
      </div>
      <div className="p-3">
        <h4
          className="text-[13px] font-medium leading-tight mb-2 line-clamp-2"
          style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
        >
          {name}
        </h4>
        {price ? (
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span
                className="text-[12px] line-through"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
              >
                {oldPrice!.toLocaleString('ru-RU')} ₽
              </span>
            )}
            <span
              className="text-[16px] font-bold"
              style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
            >
              {price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        ) : (
          <span
            className="text-[13px]"
            style={{ color: 'var(--primary)' }}
          >
            Подробнее →
          </span>
        )}
      </div>
    </a>
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

function FormattedMessage({ content, isDark, products }: FormattedMessageProps) {
  const parsedProducts = parseProductLinks(content);

  if (parsedProducts.length === 0) {
    return <FormattedTextContent content={content} isDark={isDark} />;
  }

  // Helper to find matching product from API by title
  const findMatchingProduct = (parsedName: string): Product | undefined => {
    if (!products || products.length === 0) return undefined;

    // Try to find by partial title match
    const normalizedName = parsedName.toLowerCase();
    return products.find((p) => {
      const normalizedTitle = p.title.toLowerCase();
      // Check if titles share significant words
      return normalizedTitle.includes(normalizedName) ||
             normalizedName.includes(normalizedTitle) ||
             // Match by key product identifiers (model numbers, etc.)
             normalizedName.split(' ').some(word =>
               word.length > 3 && normalizedTitle.includes(word)
             );
    });
  };

  let remainingContent = content;
  const parts: Array<{ type: 'text' | 'product'; content: string; product?: ParsedProduct; matchedProduct?: Product }> = [];

  for (const product of parsedProducts) {
    const index = remainingContent.indexOf(product.fullMatch);
    if (index !== -1) {
      if (index > 0) {
        parts.push({ type: 'text', content: remainingContent.slice(0, index) });
      }
      const matchedProduct = findMatchingProduct(product.name);
      parts.push({ type: 'product', content: '', product, matchedProduct });
      remainingContent = remainingContent.slice(index + product.fullMatch.length);
    }
  }

  if (remainingContent) {
    parts.push({ type: 'text', content: remainingContent });
  }

  // Group consecutive products together for row layout
  const groupedParts: Array<{ type: 'text' | 'products'; content: string; products?: Array<{ product: ParsedProduct; matchedProduct?: Product }> }> = [];

  for (const part of parts) {
    if (part.type === 'product' && part.product) {
      const lastGroup = groupedParts[groupedParts.length - 1];
      if (lastGroup?.type === 'products') {
        lastGroup.products!.push({ product: part.product, matchedProduct: part.matchedProduct });
      } else {
        groupedParts.push({ type: 'products', content: '', products: [{ product: part.product, matchedProduct: part.matchedProduct }] });
      }
    } else {
      groupedParts.push({ type: 'text', content: part.content });
    }
  }

  return (
    <>
      {groupedParts.map((group, i) => {
        if (group.type === 'products' && group.products) {
          return (
            <div key={i} className="flex flex-wrap gap-3 my-3">
              {group.products.map((p, j) => (
                <ProductCard
                  key={j}
                  name={p.product.name}
                  url={p.product.url}
                  price={p.product.price ?? p.matchedProduct?.newPrice}
                  oldPrice={p.matchedProduct?.oldPrice}
                  imageUrl={p.matchedProduct?.image}
                  isDark={isDark}
                />
              ))}
            </div>
          );
        }
        return <FormattedTextContent key={i} content={group.content} isDark={isDark} />;
      })}
    </>
  );
}

function FormattedTextContent({ content, isDark }: { content: string; isDark: boolean }) {
  const lines = content.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          <FormattedLine line={line} isDark={isDark} />
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
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
