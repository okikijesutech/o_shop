'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';
import { Button } from './ui/Button';

import { useMounted } from '@/hooks/useMounted';

export function QuickViewModal() {
  const mounted = useMounted();
  const isOpen = useModalStore(state => state.isOpen);
  const activeProduct = useModalStore(state => state.activeProduct);
  const closeModal = useModalStore(state => state.closeModal);
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const addToast = useToastStore(state => state.addToast);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !activeProduct) return null;

  const handleAddToCart = () => {
    addItem(activeProduct);
    addToast(`${activeProduct.name} added to cart`, 'success');
    closeModal();
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[110] pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-muted relative -z-10 h-64 md:h-auto">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                  {activeProduct.category}
                </p>
                
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  {activeProduct.name}
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-medium text-sm">{activeProduct.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    {activeProduct.reviewCount} Reviews
                  </span>
                </div>

                <p className="text-3xl font-bold mb-6">${activeProduct.price.toFixed(2)}</p>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {activeProduct.description}
                </p>

                <div className="mt-auto pt-8 border-t border-border">
                  <Button onClick={handleAddToCart} size="lg" className="w-full h-14 text-base gap-2 shadow-lg">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
