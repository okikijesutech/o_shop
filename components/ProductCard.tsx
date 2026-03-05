import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useModalStore } from "@/store/useModalStore";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/Skeleton";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
}

import { useMounted } from '@/hooks/useMounted';

export function ProductCard({ product }: ProductCardProps) {
  const mounted = useMounted();
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const addToast = useToastStore(state => state.addToast);
  const toggleItem = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  const openModal = useModalStore(state => state.openModal);

  const isFavorited = mounted ? isInWishlist(product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    addToast(`${product.name} added to cart`, 'success');
    setCartOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    if (isFavorited) {
      addToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Skeleton className="absolute inset-0 z-10" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 relative z-20"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={clsx(
              "absolute top-4 right-4 z-30 p-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm transition-all duration-300 hover:scale-110",
              mounted && isFavorited ? "text-destructive" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={clsx("w-5 h-5 transition-colors", mounted && isFavorited && "fill-current")} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="absolute top-16 right-4 z-30 p-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm transition-all duration-300 hover:scale-110 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"
            aria-label="Quick View"
          >
            <Eye className="w-5 h-5 transition-colors" />
          </button>

          {/* Quick Add Button overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-30 bg-gradient-to-t from-black/60 to-transparent flex justify-center">
            <Button onClick={handleAddToCart} size="sm" className="w-full shadow-lg gap-2">
              <ShoppingCart className="w-4 h-4" /> Quick Add
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-2 bg-background">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-1 mt-auto pt-2">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
