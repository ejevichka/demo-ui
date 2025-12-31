import { ProductCard } from './ProductCard';
import { mockProducts } from '@/lib/themes';

export function ProductGrid() {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* 4 columns grid matching Figma design */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
