'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getCartTotal, getSubtotal, clearCart, discountRate, shippingCost, applyPromoCode } = useCartStore();
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API Call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      addToast('Order placed successfully!', 'success');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We've sent a confirmation email to <span className="font-medium text-foreground">{formData.email}</span>.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center max-w-md">
         <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          You need items in your cart to proceed to checkout.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to shopping
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8 tracking-tight">Checkout</h1>
          
          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <section className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span> Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Doe" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="john.doe@example.com" />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-medium">Street Address</label>
                  <input required type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="123 Shopping Blvd" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">City</label>
                  <input required type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="text-sm font-medium">ZIP Code</label>
                  <input required type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="10001" />
                </div>
              </div>
            </section>

             {/* Payment Info */}
             <section className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span> Payment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
                  <div className="relative">
                    <input required type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full h-11 pl-12 pr-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none font-mono" placeholder="4242 4242 4242 4242" />
                    <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="expiry" className="text-sm font-medium">Expiry Date</label>
                  <input required type="text" id="expiry" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none font-mono" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
                  <input required type="text" id="cvc" name="cvc" value={formData.cvc} onChange={handleInputChange} className="w-full h-11 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none font-mono" placeholder="123" />
                </div>
              </div>
            </section>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl shadow-xl mt-4">
              {isSubmitting ? 'Processing Payment...' : `Pay $${getCartTotal().toFixed(2)}`}
            </Button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <hr className="border-border my-6" />

            {/* Promo Code Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('promo') as HTMLInputElement;
                const success = applyPromoCode(input.value);
                if (success) {
                  addToast('Promo code applied successfully!', 'success');
                } else {
                  addToast('Invalid promo code.', 'error');
                }
              }}
              className="flex gap-2 mb-6"
            >
              <input 
                type="text" 
                name="promo"
                placeholder="Discount code (try NEXTJS)" 
                className="flex-1 h-10 px-4 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none text-sm uppercase" 
              />
              <Button type="submit" variant="secondary" className="h-10 px-4">Apply</Button>
            </form>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">${getSubtotal().toFixed(2)}</span>
              </div>
              
              {discountRate > 0 && (
                <div className="flex justify-between text-secondary font-medium">
                  <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
                  <span>-${(getSubtotal() * discountRate).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground font-medium">
                  {getCartTotal() - (getSubtotal() * (1 - discountRate)) === 0 
                    ? <span className="text-green-600">Free</span> 
                    : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (Estimated)</span>
                <span className="text-foreground font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-base">Total</span>
                <span className="font-bold text-xl">${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
