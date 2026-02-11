import { ProductCard } from './ProductCard';
import { mockProductsByTheme } from '@/lib/themes';
import { useTheme } from '@/hooks/useTheme';

export function ProductGrid() {
  const { themeName } = useTheme();
  const products = mockProductsByTheme[themeName] || mockProductsByTheme.redmarket;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Centered flex layout for products */}
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div key={product.id} className="w-[calc(50%-12px)] md:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
