'use client';

import { useToastStore } from '@/store/useToastStore';
import { ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const addToast = useToastStore(state => state.addToast);

  const handleDummyLink = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    addToast('This page is not implemented in the portfolio demo.', 'info');
  };

  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter mb-4">O-SHOP</span>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A premium e-commerce portfolio experience demonstrating modern frontend architecture and polished UI design.
            </p>
            <div className="flex space-x-4">
              <button onClick={handleDummyLink} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button onClick={handleDummyLink} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button onClick={handleDummyLink} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Shop Features</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  All Categories
                </button>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-primary transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  My Wishlist
                </Link>
              </li>
              <li>
                <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Today's Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Legal</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <button onClick={handleDummyLink} className="hover:text-primary transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={handleDummyLink} className="hover:text-primary transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={handleDummyLink} className="hover:text-primary transition-colors">Refund Policy</button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Stay in the loop</h3>
            <p className="text-muted-foreground mb-4">Subscribe to see the latest styling and architecture updates.</p>
            <form onSubmit={handleDummyLink} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-muted/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} O-SHOP. Built for demonstration.</p>
          <div className="flex items-center gap-6">
            <span>Next.js 15</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>React 19</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
