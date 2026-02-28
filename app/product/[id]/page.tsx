'use client';

import { notFound, usePathname, useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Star, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  
  const product = products.find((p) => p.id === id);
  const { addItem, setCartOpen } = useCartStore();
  const { addToast } = useToastStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    addToast(`${quantity} x ${product.name} added to cart`, 'success');
    setCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery (Simplified for demo) */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              {product.reviewCount} Reviews
            </span>
          </div>

          <p className="text-4xl font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <hr className="border-border mb-8" />

          {/* Add to Cart Area */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-border rounded-lg h-12">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 h-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 font-medium min-w-[3rem] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 h-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-r-lg"
              >
                +
              </button>
            </div>
            
            <Button onClick={handleAddToCart} size="lg" className="flex-1 h-12 text-base gap-2 shadow-lg">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3 text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>2-year extended warranty available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
