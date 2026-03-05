'use client';

import { useHistoryStore } from '@/store/useHistoryStore';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';

import { useMounted } from '@/hooks/useMounted';

export function RecentlyViewed() {
  const mounted = useMounted();
  const viewedItems = useHistoryStore(state => state.viewedItems);

  // Avoid hydration mismatch by waiting for mount
  if (!mounted || viewedItems.length === 0) return null;

  return (
    <div className="w-full bg-muted/30 py-16 border-t border-border mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Recently Viewed</h2>
        
        {/* Horizontal scrollable container for history items */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x gap-6 stylish-scrollbar">
          {viewedItems.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] w-full max-w-sm snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
