import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some(item => item.id === product.id);
        
        if (exists) {
          set({ items: currentItems.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      isInWishlist: (productId) => get().items.some(item => item.id === productId),
      getItemCount: () => get().items.length,
    }),
    {
      name: 'oshop-wishlist-storage',
    }
  )
);
