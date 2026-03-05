import { Product } from '@/types';
import { products, getCategories as getCategoriesFromData } from '@/lib/data';

export const api = {
  getProducts: (): Product[] => {
    return products;
  },
  
  getProductById: (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  },

  getCategories: (): string[] => {
    return getCategoriesFromData();
  }
};
