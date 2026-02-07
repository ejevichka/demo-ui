/**
 * Tests for ProductBuyModal
 * Run with: npx vitest run src/components/store/ProductBuyModal.test.tsx
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductBuyModal } from './ProductBuyModal';
import type { Product } from '@/types';

// Mock createPortal to render in the same container
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useTheme
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: { isDark: false },
    themeName: 'bluemarket',
  }),
}));

// Mock theme data
vi.mock('@/lib/themes', () => ({
  reviewDataByTheme: {
    bluemarket: {
      'test-product-1': [
        { id: '1', author: 'Jason', text: 'Great product!', rating: 5 },
        { id: '2', author: 'Maria', text: 'Very good quality.', rating: 4 },
      ],
    },
  },
  reviewSummariesByTheme: {
    bluemarket: {
      'test-product-1': {
        totalReviews: 999,
        overallRating: 4.5,
        summary: 'Most reviewers describe the product as easy to use.',
        pros: ['Good value', 'Easy to use'],
        cons: ['Limited features'],
      },
    },
  },
}));

const mockProduct: Product = {
  id: 'test-product-1',
  title: 'Running Shoes Pro',
  image: 'https://example.com/shoes.jpg',
  oldPrice: 119.99,
  newPrice: 89.99,
  currency: '$',
  discount: '-25%',
  description: 'Your adventure starts here.',
  availability: true,
  reviewsCount: 999,
  rating: 4.5,
};

// Mock window.dispatchEvent for AI chat opening
const mockDispatchEvent = vi.fn();
const originalDispatchEvent = window.dispatchEvent;

describe('ProductBuyModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onOpenAI: vi.fn(),
    product: mockProduct,
  };

  beforeEach(() => {
    window.dispatchEvent = mockDispatchEvent;
  });

  afterEach(() => {
    window.dispatchEvent = originalDispatchEvent;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    window.dispatchEvent = mockDispatchEvent;
  });

  describe('Rendering when open', () => {
    it('renders product image', () => {
      render(<ProductBuyModal {...defaultProps} />);

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('displays product title', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText('Running Shoes Pro')).toBeInTheDocument();
    });

    it('displays product description', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText('Your adventure starts here.')).toBeInTheDocument();
    });

    it('displays prices (new and old)', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText('$89.99')).toBeInTheDocument();
      expect(screen.getByText('$119.99')).toBeInTheDocument();
    });

    it('shows Buy button', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /buy/i })).toBeInTheDocument();
    });

    it('shows AI Shopping Assistant section', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText(/AI Shopping Assistent/i)).toBeInTheDocument();
    });

    it('displays suggestion chips', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText('Suggestion')).toBeInTheDocument();
      // Should have clickable suggestion items with test IDs
      expect(screen.getByTestId('suggestion-0')).toBeInTheDocument();
      expect(screen.getByTestId('suggestion-1')).toBeInTheDocument();
      expect(screen.getByTestId('suggestion-2')).toBeInTheDocument();
    });

    it('has input field for custom questions', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByPlaceholderText(/ask something/i)).toBeInTheDocument();
    });

    it('shows reviews section with reviewer count', () => {
      render(<ProductBuyModal {...defaultProps} />);

      expect(screen.getByText(/999 reviewers/i)).toBeInTheDocument();
    });
  });

  describe('Not rendering when closed', () => {
    it('does not render content when isOpen is false', () => {
      render(<ProductBuyModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Running Shoes Pro')).not.toBeInTheDocument();
    });
  });

  describe('User interactions', () => {
    it('calls onClose when clicking backdrop', () => {
      render(<ProductBuyModal {...defaultProps} />);

      // Find backdrop (first div with onClick)
      const backdrop = screen.getByTestId('modal-backdrop');
      fireEvent.click(backdrop);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking X button', () => {
      render(<ProductBuyModal {...defaultProps} />);

      const closeButton = screen.getByTestId('close-button');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onOpenAI with product name when suggestion chip clicked', () => {
      render(<ProductBuyModal {...defaultProps} />);

      const suggestionButton = screen.getByTestId('suggestion-0');
      fireEvent.click(suggestionButton);

      // Should include product name in the question
      expect(defaultProps.onOpenAI).toHaveBeenCalledWith(
        expect.stringContaining('Running Shoes Pro')
      );
    });

    it('calls onOpenAI with product name when submitting question in input', () => {
      render(<ProductBuyModal {...defaultProps} />);

      const input = screen.getByPlaceholderText(/ask something/i);
      fireEvent.change(input, { target: { value: 'What is the best size?' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      // Should include product name in the question
      expect(defaultProps.onOpenAI).toHaveBeenCalledWith(
        expect.stringContaining('Running Shoes Pro')
      );
    });

    it('uses window event when onOpenAI not provided', () => {
      const propsWithoutCallback = {
        ...defaultProps,
        onOpenAI: undefined,
      };
      render(<ProductBuyModal {...propsWithoutCallback} />);

      const suggestionButton = screen.getByTestId('suggestion-0');
      fireEvent.click(suggestionButton);

      // Should dispatch openAIChat event with autoSend: true
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'openAIChat',
        })
      );
    });
  });
});
