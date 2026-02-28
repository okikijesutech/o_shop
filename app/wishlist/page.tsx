'use client';

import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, getItemCount } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  const hasItems = items.length > 0;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Wishlist</h1>
          <p className="text-muted-foreground text-lg">
            {hasItems 
              ? `You have ${getItemCount()} item${getItemCount() === 1 ? '' : 's'} saved.` 
              : "Keep track of the products you love."}
          </p>
        </div>
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/20">
          <div className="w-20 h-20 bg-muted flex items-center justify-center rounded-full mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Tap the heart icon on any product to save it for later and build your dream collection.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full shadow-md gap-2">
              <ShoppingBag className="w-4 h-4" /> Start Browsing
            </Button>
          </Link>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          <ProductGrid products={items} />
          
          <div className="mt-16 text-center border-t border-border pt-12">
            <h3 className="text-2xl font-semibold mb-6">Looking for more?</h3>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground focus:ring-primary">
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
