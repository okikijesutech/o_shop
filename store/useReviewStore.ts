import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Review } from '@/types';

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => { average: number; count: number };
}

// Initial mock reviews to populate the site
const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    author: 'Sarah Jenkins',
    rating: 5,
    text: 'Absolutely love the quality. It exceeded my expectations and fits perfectly into my daily routine.',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'r2',
    productId: '1',
    author: 'Mike Ross',
    rating: 4,
    text: 'Great product overall. The delivery was slightly delayed but the customer service was very helpful.',
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
];

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: MOCK_REVIEWS,
      addReview: (reviewParams) => {
        const newReview: Review = {
          ...reviewParams,
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString(),
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },
      getReviewsByProduct: (productId) => {
        return get().reviews.filter((r) => r.productId === productId);
      },
      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter((r) => r.productId === productId);
        if (productReviews.length === 0) return { average: 0, count: 0 };
        
        const sum = productReviews.reduce((acc, curr) => acc + curr.rating, 0);
        return {
          average: Number((sum / productReviews.length).toFixed(1)),
          count: productReviews.length
        };
      },
    }),
    {
      name: 'oshop-reviews-storage',
    }
  )
);
