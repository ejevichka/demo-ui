import type { ThemeConfig, Product, SuggestedQuestion, ThemeName, Review, ReviewSummary } from '@/types';

// Brand color tokens - single source of truth matching index.css
export const brandTokens: Record<ThemeName, {
  primary: string;
  primaryForeground: string;
}> = {
  brainform: {
    primary: '#C9A962',
    primaryForeground: '#FFFFFF',
  },
  bluemarket: {
    primary: '#0048D9',
    primaryForeground: '#E6EEFB',
  },
  redmarket: {
    primary: '#C30000',
    primaryForeground: '#FCE6E6',
  },
  brownmarket: {
    primary: '#82572B',
    primaryForeground: '#F5EFE8',
  },
};

export const themes: Record<string, ThemeConfig> = {
  brainform: {
    id: 'brainform',
    name: 'ElysianGlow',
    storeName: 'ElysianGlow',
    logoIcon: 'EG',
    navItems: ['Offers', 'Beauty Box', 'Brands', 'New In', 'Makeup', 'Hair', 'Skincare', 'Fragrance', "Men's", 'Body', 'Gifting', 'Luxury', 'Blog'],
    heroTitle: '20% Off Favourites',
    heroSubtitle: 'Shop the bestselling beauty of 2025 for less - featuring beauty, skincare, fragrance, and haircare heroes.',
    heroImage: '/hero-beauty.jpg',
    heroLabel: 'Flash sale',
    isDark: false,
  },
  bluemarket: {
    id: 'bluemarket',
    name: 'Peak Pulse',
    storeName: 'Peak Pulse',
    logoIcon: 'PP',
    navItems: ['Clothing', 'Shoes', 'Equipment', 'Climbing', 'Winter', 'Cycling', 'All sports', 'Brands', 'Outlet'],
    heroTitle: 'Conquer the peaks. Feel the wild pulse.',
    heroSubtitle: 'Your adventure starts here.',
    heroImage: '/hero-sport.jpg',
    isDark: false,
  },
  redmarket: {
    id: 'redmarket',
    name: 'Extra Electronics',
    storeName: 'Extra Electronics',
    logoIcon: 'E',
    navItems: ['Computers & Office', 'TV & Audio', 'Smartphones & Plans', 'Household & Living', 'Gaming & VR', 'Large household appliances', 'Offers', 'OUTLET%'],
    heroTitle: 'Discounts on electronic',
    heroSubtitle: 'until the end of the month',
    heroImage: '/hero-electronics.jpg',
    isDark: false,
  },
  brownmarket: {
    id: 'brownmarket',
    name: 'Coffee Machines',
    storeName: 'Coffee Machines',
    logoIcon: 'Coffee Machines',
    navItems: ['Automatic Machines', 'Espresso Machines', 'Drip Coffee Makers', 'Coffee Grinders', 'Capsule Machines', 'Accessories', 'Promotions'],
    heroTitle: 'Perfect milk foam with one touch',
    heroSubtitle: 'New automatic coffee machine KRUPS Sensation Milk',
    heroImage: '/hero-krups.jpg',
    isDark: true,
  },
};

export const suggestedQuestionsByTheme: Record<ThemeName, SuggestedQuestion[]> = {
  brownmarket: [
    { id: '1', text: "I'm looking for an espresso machine for home" },
    { id: '2', text: 'Recommend me an automatic coffee machine with milk frother' },
    { id: '3', text: 'Show me compact coffee machines for small kitchen' },
    { id: '4', text: 'What is the difference between automatic and capsule machines?' },
  ],
  bluemarket: [
    { id: '1', text: 'Recommend me running shoes for beginners' },
    { id: '2', text: "I need a lightweight hiking backpack" },
    { id: '3', text: 'Show me winter jackets for skiing' },
    { id: '4', text: 'What equipment do I need for hiking?' },
  ],
  redmarket: [
    { id: '1', text: 'Recommend me a laptop for work under $1000' },
    { id: '2', text: "I'm looking for a 55 inch TV for living room" },
    { id: '3', text: 'Show me wireless headphones with noise cancelling' },
    { id: '4', text: 'What is the difference between OLED and LED TV?' },
  ],
  brainform: [
    { id: '1', text: 'Recommend me an Estée Lauder serum for anti-aging' },
    { id: '2', text: "I'm looking for a long-wearing foundation" },
    { id: '3', text: 'Show me bestselling Estée Lauder products' },
    { id: '4', text: 'How to build a skincare routine?' },
  ],
};

// Default export for backward compatibility
export const suggestedQuestions = suggestedQuestionsByTheme.brownmarket;

// Mock products per theme
export const mockProductsByTheme: Record<ThemeName, Product[]> = {
  brownmarket: [
    {
      id: '1',
      title: 'Automatic Coffee Machine KRUPS ESPRESSERIA EA82F010',
      description: 'Fully automatic espresso machine with integrated milk system',
      image: '/products/krups.webp',
      images: ['/products/krups.webp', '/products/krups1_1.webp', '/products/krups1_2.webp'],
      oldPrice: 899.00,
      newPrice: 449.00,
      currency: '$',
      discount: '-50%',
      reviewsCount: 234,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Automatic Coffee Machine KRUPS Arabica EA819E10',
      description: 'Compact automatic coffee machine with conical burr grinder',
      image: '/products/krups2.jpeg',
      images: ['/products/krups2.jpeg', '/products/krups2_1.webp', '/products/krups2_2.webp'],
      oldPrice: 649.00,
      newPrice: 379.00,
      currency: '$',
      discount: '-42%',
      reviewsCount: 189,
      rating: 4.7,
    },
    {
      id: '3',
      title: 'Automatic Coffee Machine KRUPS ARABICA EA811810',
      description: 'Entry-level automatic coffee machine with LCD display',
      image: '/products/krups3.webp',
      images: ['/products/krups3.webp', '/products/krups3_1.webp', '/products/krups3_2.webp'],
      oldPrice: 699.00,
      newPrice: 379.00,
      currency: '$',
      discount: '-46%',
      reviewsCount: 156,
      rating: 4.9,
    },
  ],
  bluemarket: [
    {
      id: '1',
      title: "Athlex - Adidas Runblaze Men's Running Shoes, Black",
      description: 'Lightweight running shoes with responsive cushioning',
      image: '/products/sport1.avif',
      images: ['/products/sport1.avif', '/products/sport1_1.avif', '/products/sport1_3.avif'],
      oldPrice: 129.00,
      newPrice: 89.00,
      currency: '$',
      discount: '-31%',
      reviewsCount: 423,
      rating: 4.7,
    },
    {
      id: '2',
      title: "361° - 361-MERAKI 6 Men's Running Shoes, Grey/Yellow-Green",
      description: 'Performance running shoes with QU!KFOAM technology',
      image: '/products/sport2.webp',
      images: ['/products/sport2.webp', '/products/sport2_2.webp', '/products/sport2_3.webp'],
      oldPrice: 119.00,
      newPrice: 79.00,
      currency: '$',
      discount: '-34%',
      reviewsCount: 256,
      rating: 4.8,
    },
    {
      id: '3',
      title: "Men's Running Shoes Athlex Navi Wtr Black",
      description: 'Water-resistant running shoes for all weather conditions',
      image: '/products/sport3.jpg',
      images: ['/products/sport3.jpg', '/products/sport3_2.jpg', '/products/sport3_3.jpg'],
      oldPrice: 139.00,
      newPrice: 99.00,
      currency: '$',
      discount: '-29%',
      reviewsCount: 189,
      rating: 4.6,
    },
  ],
  redmarket: [
    {
      id: '1',
      title: 'Wireless Headphones Sony WH-1000XM5',
      description: 'Industry-leading noise cancellation with 30-hour battery life',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      oldPrice: 399.00,
      newPrice: 299.00,
      currency: '$',
      discount: '-25%',
      reviewsCount: 1243,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Smart Watch Samsung Galaxy Watch 6',
      description: 'Advanced health monitoring with sleep tracking and GPS',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
      oldPrice: 329.00,
      newPrice: 249.00,
      currency: '$',
      discount: '-24%',
      reviewsCount: 567,
      rating: 4.5,
    },
    {
      id: '3',
      title: 'MacBook Pro 14" M3 Pro 512GB',
      description: 'Apple Silicon M3 Pro chip for professional performance',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      oldPrice: 1999.00,
      newPrice: 1799.00,
      currency: '$',
      discount: '-10%',
      reviewsCount: 892,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'LG OLED TV 55" C3 Series 4K',
      description: 'Self-lit OLED pixels for perfect blacks and vibrant colors',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
      oldPrice: 1299.00,
      newPrice: 999.00,
      currency: '$',
      discount: '-23%',
      reviewsCount: 445,
      rating: 4.7,
    },
  ],
  brainform: [
    {
      id: '1',
      title: 'CLINIQUE - Smart Clinical Repair™ Serum',
      description: 'Anti-aging serum with peptides for wrinkle repair',
      image: '/products/beauty1_1.avif',
      images: ['/products/beauty1_1.avif', '/products/beauty1_2.avif', '/products/beauty.avif'],
      oldPrice: 115.00,
      newPrice: 98.00,
      currency: '$',
      discount: '-15%',
      reviewsCount: 1892,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'CLINIQUE - Smart Clinical Repair™',
      description: 'Wrinkle correcting cream with retinoid technology',
      image: '/products/beauty2.webp',
      images: ['/products/beauty2.webp', '/products/beauty2_1.webp', '/products/beauty2_2.webp'],
      oldPrice: 89.00,
      newPrice: 75.00,
      currency: '$',
      discount: '-16%',
      reviewsCount: 1245,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'CLINIQUE - Even Better Clinical',
      description: 'Dark spot corrector and optimizer serum',
      image: '/products/beauty3.avif',
      images: ['/products/beauty3.avif', '/products/beauty3_1.jpg', '/products/beauty3_2.avif'],
      oldPrice: 99.00,
      newPrice: 84.00,
      currency: '$',
      discount: '-15%',
      reviewsCount: 2156,
      rating: 4.7,
    },
  ],
};

// Legacy export for backward compatibility
export const mockProducts: Product[] = mockProductsByTheme.redmarket;

export function getTheme(themeName: string): ThemeConfig {
  return themes[themeName] || themes.brainform;
}

// Mock reviews data by theme and product ID
export const reviewDataByTheme: Record<ThemeName, Record<string, Review[]>> = {
  brownmarket: {
    '1': [
      { id: 'r1', productId: '1', author: 'Emma Wilson', rating: 5, text: 'The ESPRESSERIA EA82F010 makes incredible espresso! Milk system is fantastic.', date: '2025-01-15', verified: true },
      { id: 'r2', productId: '1', author: 'James Chen', rating: 5, text: 'Perfect milk froth every time. Best coffee machine I have owned.', date: '2025-01-10', verified: true },
      { id: 'r3', productId: '1', author: 'Sophie Martin', rating: 4, text: 'Easy to clean and maintain. Great value for the price!', date: '2025-01-05', verified: false },
    ],
    '2': [
      { id: 'r4', productId: '2', author: 'Michael Brown', rating: 5, text: 'The Arabica EA819E10 is compact but powerful. Perfect for my small kitchen!', date: '2025-01-12', verified: true },
      { id: 'r5', productId: '2', author: 'Anna Schmidt', rating: 4, text: 'Great coffee quality from fresh beans. The grinder is very quiet.', date: '2025-01-08', verified: true },
    ],
    '3': [
      { id: 'r6', productId: '3', author: 'David Lee', rating: 5, text: 'ARABICA EA811810 is perfect entry-level machine. LCD display is easy to read.', date: '2025-01-14', verified: true },
      { id: 'r7', productId: '3', author: 'Lisa Park', rating: 5, text: 'Excellent value! Makes great espresso and cappuccino every morning.', date: '2025-01-11', verified: true },
    ],
  },
  bluemarket: {
    '1': [
      { id: 'r10', productId: '1', author: 'Alex Runner', rating: 5, text: 'Adidas Runblaze are incredibly lightweight! Perfect for daily runs.', date: '2025-01-15', verified: true },
      { id: 'r11', productId: '1', author: 'Sarah Sports', rating: 5, text: 'Great cushioning and responsive feel. Love the black color!', date: '2025-01-12', verified: true },
      { id: 'r12', productId: '1', author: 'Mike Active', rating: 4, text: 'Comfortable from the first run. Good value for Adidas quality.', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r13', productId: '2', author: 'Chris Marathon', rating: 5, text: '361-MERAKI 6 exceeded my expectations! QU!KFOAM is amazing.', date: '2025-01-14', verified: true },
      { id: 'r14', productId: '2', author: 'Jenny Runner', rating: 4, text: 'Great shoes for the price. The grey/yellow-green looks stylish.', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r15', productId: '3', author: 'Tom Outdoor', rating: 5, text: 'Athlex Navi Wtr keeps my feet dry in any weather. Highly recommend!', date: '2025-01-13', verified: true },
      { id: 'r16', productId: '3', author: 'Kate Trail', rating: 4, text: 'Perfect for rainy days. Water-resistant and still breathable.', date: '2025-01-11', verified: true },
    ],
  },
  redmarket: {
    '1': [
      { id: 'r19', productId: '1', author: 'Tech Reviewer', rating: 5, text: 'Best noise cancelling headphones on the market. Sound quality is phenomenal!', date: '2025-01-15', verified: true },
      { id: 'r20', productId: '1', author: 'Music Lover', rating: 5, text: 'Battery life is incredible. Comfortable for all-day wear.', date: '2025-01-12', verified: true },
      { id: 'r21', productId: '1', author: 'Work Remote', rating: 4, text: 'Perfect for WFH calls. ANC blocks out everything!', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r22', productId: '2', author: 'Fitness Fan', rating: 5, text: 'Great health tracking features. Sleep monitoring is very accurate.', date: '2025-01-14', verified: true },
      { id: 'r23', productId: '2', author: 'Daily User', rating: 4, text: 'Beautiful display and smooth interface. Battery could be better.', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r24', productId: '3', author: 'Pro User', rating: 5, text: 'M3 Pro chip is blazing fast. Best laptop I\'ve ever used for development.', date: '2025-01-13', verified: true },
      { id: 'r25', productId: '3', author: 'Creative Pro', rating: 5, text: 'Display is stunning for video editing. Worth every penny!', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r26', productId: '4', author: 'Movie Buff', rating: 5, text: 'OLED blacks are incredible. Gaming mode is super responsive.', date: '2025-01-15', verified: true },
      { id: 'r27', productId: '4', author: 'Home Theater', rating: 4, text: 'Amazing picture quality. WebOS is smooth and easy to use.', date: '2025-01-09', verified: true },
    ],
  },
  brainform: {
    '1': [
      { id: 'r28', productId: '1', author: 'Skincare Expert', rating: 5, text: 'Smart Clinical Repair Serum is amazing! Visible wrinkle reduction in weeks.', date: '2025-01-15', verified: true },
      { id: 'r29', productId: '1', author: 'Beauty Blogger', rating: 5, text: 'Love the peptide formula. My skin feels firmer and looks younger.', date: '2025-01-12', verified: true },
      { id: 'r30', productId: '1', author: 'Clinique Fan', rating: 4, text: 'Absorbs quickly and works great under makeup. Highly recommend!', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r31', productId: '2', author: 'Anti-Aging Lover', rating: 5, text: 'Smart Clinical Repair cream transformed my skin! Wrinkles are less visible.', date: '2025-01-14', verified: true },
      { id: 'r32', productId: '2', author: 'Daily User', rating: 5, text: 'The retinoid technology really works. My skin texture improved dramatically.', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r33', productId: '3', author: 'Dark Spot Fighter', rating: 5, text: 'Even Better Clinical faded my dark spots in just 4 weeks!', date: '2025-01-13', verified: true },
      { id: 'r34', productId: '3', author: 'Skincare Addict', rating: 4, text: 'Great for hyperpigmentation. My skin tone is more even now.', date: '2025-01-11', verified: true },
    ],
  },
};

// Mock review summaries by theme and product ID
export const reviewSummariesByTheme: Record<ThemeName, Record<string, ReviewSummary>> = {
  brownmarket: {
    '1': { productId: '1', overallRating: 4.8, totalReviews: 234, summary: 'The KRUPS ESPRESSERIA EA82F010 delivers exceptional espresso with an integrated milk system. Customers praise the build quality and consistent coffee.', pros: ['Integrated milk system', 'Great espresso', 'Easy to clean'], cons: ['Slightly noisy'] },
    '2': { productId: '2', overallRating: 4.7, totalReviews: 189, summary: 'Compact and powerful, the Arabica EA819E10 features a conical burr grinder for fresh coffee every time. Perfect for small kitchens.', pros: ['Compact design', 'Quiet grinder', 'Fresh coffee'], cons: ['Smaller water tank'] },
    '3': { productId: '3', overallRating: 4.9, totalReviews: 156, summary: 'The ARABICA EA811810 is an excellent entry-level automatic coffee machine with LCD display. Great value for money.', pros: ['Great value', 'LCD display', 'Easy to use'], cons: ['Basic features'] },
  },
  bluemarket: {
    '1': { productId: '1', overallRating: 4.7, totalReviews: 423, summary: 'The Adidas Runblaze offers lightweight performance with responsive cushioning. Perfect for daily running.', pros: ['Lightweight', 'Responsive cushioning', 'Adidas quality'], cons: ['Limited color options'] },
    '2': { productId: '2', overallRating: 4.8, totalReviews: 256, summary: '361-MERAKI 6 features QU!KFOAM technology for superior comfort. Great value performance running shoes.', pros: ['QU!KFOAM technology', 'Stylish design', 'Great value'], cons: ['Less known brand'] },
    '3': { productId: '3', overallRating: 4.6, totalReviews: 189, summary: 'Athlex Navi Wtr provides water-resistant protection without sacrificing breathability. Ideal for all weather.', pros: ['Water-resistant', 'Breathable', 'All-weather use'], cons: ['Slightly heavier'] },
  },
  redmarket: {
    '1': { productId: '1', overallRating: 4.8, totalReviews: 1243, summary: 'Industry-leading noise cancellation with exceptional sound quality. Users praise the comfort and battery life.', pros: ['Best-in-class ANC', 'Amazing sound', 'Long battery life'], cons: ['Premium price'] },
    '2': { productId: '2', overallRating: 4.5, totalReviews: 567, summary: 'Feature-rich smartwatch with accurate health tracking and beautiful display. Great for fitness enthusiasts.', pros: ['Accurate tracking', 'Beautiful display', 'Smooth interface'], cons: ['Battery life'] },
    '3': { productId: '3', overallRating: 4.9, totalReviews: 892, summary: 'The M3 Pro delivers exceptional performance for professionals. Users love the display and build quality.', pros: ['Blazing fast', 'Stunning display', 'Premium build'], cons: ['Expensive'] },
    '4': { productId: '4', overallRating: 4.7, totalReviews: 445, summary: 'Incredible OLED picture quality with deep blacks and vibrant colors. Great for movies and gaming.', pros: ['Amazing picture', 'Low input lag', 'Smart TV features'], cons: ['Risk of burn-in'] },
  },
  brainform: {
    '1': { productId: '1', overallRating: 4.9, totalReviews: 1892, summary: 'CLINIQUE Smart Clinical Repair Serum delivers visible wrinkle reduction with peptide technology. Users praise the fast-absorbing formula.', pros: ['Wrinkle reduction', 'Fast absorbing', 'Peptide formula'], cons: ['Premium price'] },
    '2': { productId: '2', overallRating: 4.8, totalReviews: 1245, summary: 'Smart Clinical Repair cream with retinoid technology improves skin texture and reduces wrinkles. Great for mature skin.', pros: ['Retinoid technology', 'Improves texture', 'Anti-aging'], cons: ['May cause sensitivity'] },
    '3': { productId: '3', overallRating: 4.7, totalReviews: 2156, summary: 'Even Better Clinical is highly effective for dark spots and hyperpigmentation. Users see visible results in weeks.', pros: ['Fades dark spots', 'Evens skin tone', 'Clinically proven'], cons: ['Takes time to see results'] },
  },
};
