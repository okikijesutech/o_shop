'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { AnimatePresence, motion } from 'framer-motion';

export function NavSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchQuery = useSearchStore(state => state.searchQuery);
  const setSearchQuery = useSearchStore(state => state.setSearchQuery);

  // Handle click outside to close search if empty
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        if (!searchQuery) {
          setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleSearchToggle = () => {
    if (isSearchOpen && !searchQuery) {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="relative flex items-center justify-end h-10" ref={searchInputRef}>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (window.scrollY < 300) {
                window.scrollTo({ top: 500, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 h-full pl-4 pr-10 text-sm bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 origin-right placeholder:text-muted-foreground"
          />
        )}
      </AnimatePresence>
      
      <button 
        onClick={handleSearchToggle}
        className={`p-2 rounded-full transition-colors z-10 ${isSearchOpen ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
        aria-label="Toggle Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
