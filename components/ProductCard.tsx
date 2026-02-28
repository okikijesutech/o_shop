import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "./ui/Skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCartStore();
  const { addToast } = useToastStore();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    addToast(`${product.name} added to cart`, 'success');
    setCartOpen(true);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {!imgLoaded && <Skeleton className="absolute inset-0 z-10" />}
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
          {/* Quick Add Button overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-20 bg-gradient-to-t from-black/60 to-transparent flex justify-center">
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
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
