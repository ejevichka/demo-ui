import { ProductCard } from './ProductCard';
import { mockProductsByTheme } from '@/lib/themes';
import { useTheme } from '@/hooks/useTheme';

export function ProductGrid() {
  const { themeName } = useTheme();
  const products = mockProductsByTheme[themeName] || mockProductsByTheme.redmarket;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* 4 columns grid matching Figma design */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
