import { create } from 'zustand';
import { Product } from '@/lib/data';

interface ModalState {
  isOpen: boolean;
  activeProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  activeProduct: null,
  openModal: (product) => set({ isOpen: true, activeProduct: product }),
  closeModal: () => set({ isOpen: false, activeProduct: null }),
}));
