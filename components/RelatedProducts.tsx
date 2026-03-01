'use client';

import { useMemo } from 'react';
import { products, Product } from '@/lib/data';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Find up to 4 other products in the same category, excluding the current one
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === category && p.id !== currentProductId)
      .slice(0, 4);
  }, [currentProductId, category]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
        <a href="/" className="text-sm font-medium text-primary hover:underline">
          View more {category.toLowerCase()}
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
