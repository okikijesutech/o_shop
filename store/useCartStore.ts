import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  discountRate: number;
  shippingCost: number;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  clearCart: () => void;
  getSubtotal: () => number;
  getCartTotal: () => number;
  getItemCount: () => number;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      discountRate: 0,
      shippingCost: 15, // Flat rate mock shipping
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      applyPromoCode: (code: string) => {
        const promoCodes = ['SUMMER20', 'NEXTJS'];
        if (promoCodes.includes(code.toUpperCase())) {
          set({ discountRate: 0.2 }); // 20% off
          return true;
        }
        set({ discountRate: 0 });
        return false;
      },
      clearCart: () => set({ items: [], discountRate: 0 }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discounted = subtotal * (1 - get().discountRate);
        // Free shipping over $50
        const finalShipping = discounted > 50 ? 0 : get().shippingCost; 
        return discounted + finalShipping;
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'o-shop-cart-storage',
    }
  )
);
