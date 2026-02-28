import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/Skeleton";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const { addItem, setCartOpen } = useCartStore();
  const { addToast } = useToastStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              "absolute top-3 right-3 z-30 p-2.5 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm transition-all duration-300 hover:scale-110",
              mounted && isFavorited ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
            aria-label="Toggle Wishlist"
          >
            <Heart className={clsx("w-4 h-4 transition-all duration-300", mounted && isFavorited && "fill-current scale-110")} />
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
