'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, Sun, Moon, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useState, useEffect, useRef } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import { useMounted } from '@/hooks/useMounted';
import { NavSearch } from './NavSearch';

export function Navbar() {
  const mounted = useMounted();
  const getItemCount = useCartStore(state => state.getItemCount);
  const toggleCart = useCartStore(state => state.toggleCart);
  const getWishlistCount = useWishlistStore(state => state.getItemCount);
  const { theme, setTheme } = useTheme();

  const itemCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <button className="md:hidden p-2 text-foreground/80 hover:text-foreground">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          O-SHOP
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground mr-auto ml-12">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <button 
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} 
            className="hover:text-foreground transition-colors"
          >
            Categories
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} 
            className="hover:text-foreground transition-colors"
          >
            Deals
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-foreground transition-colors"
          >
            About
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <NavSearch />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-foreground/80 hover:text-foreground transition-colors rounded-full"
            aria-label="Toggle Theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          {/* Wishlist Link */}
          <Link 
            href="/wishlist"
            className="p-2 text-foreground/80 hover:text-foreground transition-colors relative" 
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Toggle */}
          <button 
            onClick={toggleCart} 
            className="p-2 text-foreground/80 hover:text-foreground transition-colors relative" 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
