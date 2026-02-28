'use client';

import { useState, useMemo, useEffect } from 'react';
import { products as initialProducts, getCategories } from '@/lib/data';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { HeroCarousel } from '@/components/HeroCarousel';
import { useSearchStore } from '@/store/useSearchStore';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const { searchQuery } = useSearchStore();
  const categories = getCategories();

  // Reset page when category, sort, or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy, searchQuery]);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = initialProducts;

    // 1. Search Query Filter (Fuzzy match name or description)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 3. Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [activeCategory, sortBy, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar (Filters) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg text-left whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search results for "${searchQuery}"` : (activeCategory === 'All' ? 'All Products' : activeCategory)}
              <span className="text-sm font-normal text-muted-foreground ml-3">
                {filteredAndSortedProducts.length} results
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-muted-foreground">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border-border bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none pr-8 cursor-pointer shadow-sm relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: `right 0.5rem center`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `1.2em 1.2em`,
                }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>

          <ProductGrid products={paginatedProducts} />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        </div>
      </section>
    </div>
  );
}
