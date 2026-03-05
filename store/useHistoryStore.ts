import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface HistoryState {
  viewedItems: Product[];
  addHistoryItem: (product: Product) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 10;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      viewedItems: [],
      addHistoryItem: (product) => {
        set((state) => {
          // Remove the product if it already exists to avoid duplicates
          const filteredItems = state.viewedItems.filter((item) => item.id !== product.id);
          
          // Add to the front of the array and cap at MAX_HISTORY
          const newHistory = [product, ...filteredItems].slice(0, MAX_HISTORY);
          
          return { viewedItems: newHistory };
        });
      },
      clearHistory: () => set({ viewedItems: [] }),
    }),
    {
      name: 'oshop-history-storage',
    }
  )
);
