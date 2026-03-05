'use client';

import { useState } from 'react';
import { useReviewStore } from '@/store/useReviewStore';
import { useToastStore } from '@/store/useToastStore';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const addReview = useReviewStore(state => state.addReview);
  const getReviewsByProduct = useReviewStore(state => state.getReviewsByProduct);
  const getAverageRating = useReviewStore(state => state.getAverageRating);
  const addToast = useToastStore(state => state.addToast);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const reviews = getReviewsByProduct(productId);
  const { average, count } = getAverageRating(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      addToast('Please fill out all fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate short network delay
    setTimeout(() => {
      addReview({
        productId,
        author,
        rating,
        text,
      });
      addToast('Review submitted successfully!', 'success');
      setAuthor('');
      setText('');
      setRating(5);
      setIsSubmitting(false);
    }, 600);
  };

  const renderStars = (ratingValue: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < ratingValue ? 'fill-secondary text-secondary' : 'text-muted-foreground stroke-[1.5]'}`} 
      />
    ));
  };

  return (
    <div className="mt-20 pt-16 border-t border-border" id="reviews">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        
        {/* Review Summary */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            Customer Reviews
            <span className="text-sm font-medium px-3 py-1 bg-muted text-foreground rounded-full">
              {count}
            </span>
          </h2>
          
          {count > 0 ? (
            <div className="flex items-end gap-4">
              <span className="text-5xl font-extrabold tracking-tighter">{average}</span>
              <div className="flex flex-col pb-1">
                <div className="flex gap-1 mb-1">{renderStars(Math.round(average))}</div>
                <span className="text-sm text-muted-foreground">Based on {count} reviews</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">This product doesn't have any reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-muted/30 p-6 rounded-2xl border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" /> Write a Review
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-secondary text-secondary' : 'text-muted-foreground stroke-1'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div>
              <textarea
                placeholder="What did you think about this product?"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] text-sm resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 rounded-2xl border border-border/40 bg-card hover:bg-muted/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{review.author}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex gap-1 bg-muted/50 px-3 py-1.5 rounded-full">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">"{review.text}"</p>
          </div>
        ))}
      </div>

    </div>
  );
}
