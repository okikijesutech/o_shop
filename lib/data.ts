export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-fidelity sound with active noise cancellation and 30-hour battery life. Perfect for audiophiles and travelers.",
    price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    id: "2",
    name: "Minimalist Leather Backpack",
    description: "Handcrafted from full-grain leather. Features a padded laptop sleeve and multiple organizational pockets.",
    price: 185.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    rating: 4.9,
    reviewCount: 84,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your health metrics, receive notifications, and enjoy specialized workout modes with a gorgeous OLED display.",
    price: 249.50,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.6,
    reviewCount: 342,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "The perfect everyday tee. Breathable, ethically sourced organic cotton in a tailored but relaxed fit.",
    price: 35.00,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    rating: 4.5,
    reviewCount: 520,
  },
  {
    id: "5",
    name: "Ceramic Pour-Over Coffee Maker",
    description: "Brew barista-quality coffee at home. Elegant matte ceramic design with a premium wooden base.",
    price: 48.00,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    rating: 4.7,
    reviewCount: 215,
  },
  {
    id: "6",
    name: "Noise-Isolating Earbuds",
    description: "Compact true wireless earbuds delivering punchy bass and crystal clear highs. Sweat and water-resistant.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    rating: 4.4,
    reviewCount: 430,
  },
  {
    id: "7",
    name: "Classic Aviator Sunglasses",
    description: "Polarized lenses with UV400 protection framed in lightweight, durable alloy.",
    price: 85.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    rating: 4.8,
    reviewCount: 190,
  },
  {
    id: "8",
    name: "Linen Blend Button-Down",
    description: "A breezy, versatile outer layer perfect for summer evenings and casual office days.",
    price: 65.00,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80",
    rating: 4.6,
    reviewCount: 112,
  },
];

export const getCategories = () => {
  const categories = products.map((product) => product.category);
  return ["All", ...Array.from(new Set(categories))];
};
