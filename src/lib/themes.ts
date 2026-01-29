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
    name: 'KRUPS',
    storeName: 'KRUPS',
    logoIcon: 'KRUPS',
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
    { id: '1', text: 'Recommend me a moisturizer for dry skin' },
    { id: '2', text: "I'm looking for a gift set under $50" },
    { id: '3', text: 'Show me bestselling fragrances for women' },
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
      title: 'KRUPS Sensation Automatic Espresso Machine',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop',
      oldPrice: 899.00,
      newPrice: 699.00,
      currency: '€',
      discount: '-22%',
      reviewsCount: 234,
      rating: 4.7,
    },
    {
      id: '2',
      title: 'KRUPS Evidence One Automatic Coffee Machine',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
      oldPrice: 749.00,
      newPrice: 599.00,
      currency: '€',
      discount: '-20%',
      reviewsCount: 189,
      rating: 4.5,
    },
    {
      id: '3',
      title: 'KRUPS Nespresso Vertuo Next Capsule Machine',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
      oldPrice: 199.00,
      newPrice: 149.00,
      currency: '€',
      discount: '-25%',
      reviewsCount: 567,
      rating: 4.8,
    },
    {
      id: '4',
      title: 'KRUPS Precision Coffee Grinder GVX242',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop',
      oldPrice: 89.00,
      newPrice: 69.00,
      currency: '€',
      discount: '-22%',
      reviewsCount: 312,
      rating: 4.4,
    },
  ],
  bluemarket: [
    {
      id: '1',
      title: 'Trail Running Shoes Salomon Speedcross 6',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      oldPrice: 160.00,
      newPrice: 119.00,
      currency: '£',
      discount: '-26%',
      reviewsCount: 423,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'Ultralight Hiking Backpack 40L',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      oldPrice: 120.00,
      newPrice: 89.00,
      currency: '£',
      discount: '-26%',
      reviewsCount: 156,
      rating: 4.6,
    },
    {
      id: '3',
      title: 'Mountain Bike Cannondale Trail 6',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop',
      oldPrice: 899.00,
      newPrice: 699.00,
      currency: '£',
      discount: '-22%',
      reviewsCount: 89,
      rating: 4.7,
    },
    {
      id: '4',
      title: 'Climbing Harness Petzl Corax',
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=300&h=300&fit=crop',
      oldPrice: 75.00,
      newPrice: 59.00,
      currency: '£',
      discount: '-21%',
      reviewsCount: 278,
      rating: 4.8,
    },
  ],
  redmarket: [
    {
      id: '1',
      title: 'Wireless Headphones Sony WH-1000XM5',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      oldPrice: 399.00,
      newPrice: 299.00,
      currency: '£',
      discount: '-25%',
      reviewsCount: 1243,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Smart Watch Samsung Galaxy Watch 6',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
      oldPrice: 329.00,
      newPrice: 249.00,
      currency: '£',
      discount: '-24%',
      reviewsCount: 567,
      rating: 4.5,
    },
    {
      id: '3',
      title: 'MacBook Pro 14" M3 Pro 512GB',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      oldPrice: 1999.00,
      newPrice: 1799.00,
      currency: '£',
      discount: '-10%',
      reviewsCount: 892,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'LG OLED TV 55" C3 Series 4K',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
      oldPrice: 1299.00,
      newPrice: 999.00,
      currency: '£',
      discount: '-23%',
      reviewsCount: 445,
      rating: 4.7,
    },
  ],
  brainform: [
    {
      id: '1',
      title: 'La Mer Crème de la Mer Moisturizer 60ml',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop',
      oldPrice: 350.00,
      newPrice: 280.00,
      currency: '£',
      discount: '-20%',
      reviewsCount: 523,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'Chanel No. 5 Eau de Parfum 100ml',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
      oldPrice: 135.00,
      newPrice: 108.00,
      currency: '£',
      discount: '-20%',
      reviewsCount: 1892,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Dyson Airwrap Complete Styler',
      image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop',
      oldPrice: 479.00,
      newPrice: 399.00,
      currency: '£',
      discount: '-17%',
      reviewsCount: 2341,
      rating: 4.6,
    },
    {
      id: '4',
      title: 'Charlotte Tilbury Pillow Talk Lipstick Set',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      oldPrice: 65.00,
      newPrice: 52.00,
      currency: '£',
      discount: '-20%',
      reviewsCount: 789,
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
      { id: 'r1', productId: '1', author: 'Emma Wilson', rating: 5, text: 'Best coffee machine I\'ve ever owned. The milk froth is perfect every time! Makes barista-quality drinks at home.', date: '2025-01-15', verified: true },
      { id: 'r2', productId: '1', author: 'James Chen', rating: 4, text: 'Great machine overall. Slightly noisy during operation but the coffee quality makes up for it.', date: '2025-01-10', verified: true },
      { id: 'r3', productId: '1', author: 'Sophie Martin', rating: 5, text: 'Easy to clean and maintain. The automatic programs are a lifesaver in the morning rush!', date: '2025-01-05', verified: false },
    ],
    '2': [
      { id: 'r4', productId: '2', author: 'Michael Brown', rating: 5, text: 'Compact design fits perfectly in my small kitchen. Coffee tastes amazing!', date: '2025-01-12', verified: true },
      { id: 'r5', productId: '2', author: 'Anna Schmidt', rating: 4, text: 'Good value for money. The interface is intuitive and easy to use.', date: '2025-01-08', verified: true },
    ],
    '3': [
      { id: 'r6', productId: '3', author: 'David Lee', rating: 5, text: 'Perfect for quick morning coffees. The Vertuo system is genius!', date: '2025-01-14', verified: true },
      { id: 'r7', productId: '3', author: 'Lisa Park', rating: 5, text: 'Love the variety of pod sizes. Great crema every time.', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r8', productId: '4', author: 'Robert Taylor', rating: 4, text: 'Grinds coffee beans evenly. Good build quality for the price.', date: '2025-01-13', verified: true },
      { id: 'r9', productId: '4', author: 'Maria Garcia', rating: 5, text: 'Essential for fresh coffee. Multiple grind settings work great!', date: '2025-01-09', verified: false },
    ],
  },
  bluemarket: {
    '1': [
      { id: 'r10', productId: '1', author: 'Alex Runner', rating: 5, text: 'Amazing grip on all terrains! These shoes have transformed my trail running experience.', date: '2025-01-15', verified: true },
      { id: 'r11', productId: '1', author: 'Sarah Trail', rating: 5, text: 'Lightweight yet durable. Perfect for long distance runs in the mountains.', date: '2025-01-12', verified: true },
      { id: 'r12', productId: '1', author: 'Mike Outdoor', rating: 4, text: 'Great shoes but took a few runs to break in. Now they\'re my favorites!', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r13', productId: '2', author: 'Chris Hiker', rating: 5, text: 'Incredibly light for a 40L pack. Comfortable even on long treks.', date: '2025-01-14', verified: true },
      { id: 'r14', productId: '2', author: 'Jenny Mountain', rating: 4, text: 'Good organization pockets. Hip belt could be more padded.', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r15', productId: '3', author: 'Tom Cyclist', rating: 5, text: 'Handles everything from trails to gravel roads. Great value!', date: '2025-01-13', verified: true },
      { id: 'r16', productId: '3', author: 'Kate Rider', rating: 5, text: 'Smooth gear shifting and reliable brakes. Perfect entry-level MTB.', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r17', productId: '4', author: 'Dan Climber', rating: 5, text: 'Super comfortable harness. The gear loops are well positioned.', date: '2025-01-15', verified: true },
      { id: 'r18', productId: '4', author: 'Amy Rock', rating: 4, text: 'Great for beginners and intermediate climbers. Easy to adjust.', date: '2025-01-09', verified: true },
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
      { id: 'r28', productId: '1', author: 'Skincare Expert', rating: 5, text: 'The holy grail of moisturizers! My skin has never looked better.', date: '2025-01-15', verified: true },
      { id: 'r29', productId: '1', author: 'Beauty Blogger', rating: 5, text: 'Worth the splurge. Absorbs beautifully and lasts all day.', date: '2025-01-12', verified: true },
      { id: 'r30', productId: '1', author: 'Dry Skin Saver', rating: 4, text: 'Finally found a moisturizer that works! A little goes a long way.', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r31', productId: '2', author: 'Fragrance Fan', rating: 5, text: 'Timeless classic. The scent lasts all day and gets compliments!', date: '2025-01-14', verified: true },
      { id: 'r32', productId: '2', author: 'Gift Buyer', rating: 5, text: 'Perfect gift for any occasion. Elegant packaging too!', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r33', productId: '3', author: 'Hair Stylist', rating: 5, text: 'Game changer for styling! Damages hair less than traditional tools.', date: '2025-01-13', verified: true },
      { id: 'r34', productId: '3', author: 'Curly Hair', rating: 4, text: 'Takes practice to master but results are salon-quality!', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r35', productId: '4', author: 'Makeup Artist', rating: 5, text: 'The perfect everyday nude. Flattering on all skin tones!', date: '2025-01-15', verified: true },
      { id: 'r36', productId: '4', author: 'Lipstick Lover', rating: 5, text: 'So creamy and long-lasting. The liner is a great bonus!', date: '2025-01-09', verified: true },
    ],
  },
};

// Mock review summaries by theme and product ID
export const reviewSummariesByTheme: Record<ThemeName, Record<string, ReviewSummary>> = {
  brownmarket: {
    '1': { productId: '1', overallRating: 4.7, totalReviews: 234, summary: 'Customers love the KRUPS Sensation for its exceptional milk frothing and consistent espresso quality. The machine is praised for being easy to clean and producing barista-quality drinks at home.', pros: ['Perfect milk foam', 'Easy to clean', 'Consistent espresso quality'], cons: ['Slightly noisy', 'Large footprint'] },
    '2': { productId: '2', overallRating: 4.5, totalReviews: 189, summary: 'The Evidence One is praised for its compact design and intuitive interface. Users appreciate the good value for money and reliable performance.', pros: ['Compact design', 'Intuitive interface', 'Good value'], cons: ['Water tank could be larger'] },
    '3': { productId: '3', overallRating: 4.8, totalReviews: 567, summary: 'The Vertuo Next is highly rated for quick brewing and excellent crema. Users love the variety of pod sizes and the centrifusion technology.', pros: ['Quick brewing', 'Great crema', 'Easy to use'], cons: ['Pods can be expensive'] },
    '4': { productId: '4', overallRating: 4.4, totalReviews: 312, summary: 'A reliable coffee grinder with consistent results. Users appreciate the multiple grind settings and solid build quality.', pros: ['Even grinding', 'Multiple settings', 'Good build quality'], cons: ['Can be messy'] },
  },
  bluemarket: {
    '1': { productId: '1', overallRating: 4.9, totalReviews: 423, summary: 'The Speedcross 6 is praised for exceptional grip and durability on all terrains. Runners love the lightweight feel and trail performance.', pros: ['Amazing grip', 'Lightweight', 'Durable'], cons: ['Requires break-in period'] },
    '2': { productId: '2', overallRating: 4.6, totalReviews: 156, summary: 'An incredibly light pack with great organization. Hikers appreciate the comfort on long treks.', pros: ['Very lightweight', 'Good organization', 'Comfortable'], cons: ['Hip belt padding could improve'] },
    '3': { productId: '3', overallRating: 4.7, totalReviews: 89, summary: 'Great entry-level mountain bike with smooth shifting and reliable components. Perfect for trails and gravel.', pros: ['Smooth gears', 'Reliable brakes', 'Great value'], cons: ['Heavy for advanced riders'] },
    '4': { productId: '4', overallRating: 4.8, totalReviews: 278, summary: 'A comfortable and well-designed climbing harness suitable for all skill levels. Easy to adjust and secure.', pros: ['Very comfortable', 'Good gear loops', 'Easy adjustment'], cons: ['Not ideal for ice climbing'] },
  },
  redmarket: {
    '1': { productId: '1', overallRating: 4.8, totalReviews: 1243, summary: 'Industry-leading noise cancellation with exceptional sound quality. Users praise the comfort and battery life.', pros: ['Best-in-class ANC', 'Amazing sound', 'Long battery life'], cons: ['Premium price'] },
    '2': { productId: '2', overallRating: 4.5, totalReviews: 567, summary: 'Feature-rich smartwatch with accurate health tracking and beautiful display. Great for fitness enthusiasts.', pros: ['Accurate tracking', 'Beautiful display', 'Smooth interface'], cons: ['Battery life'] },
    '3': { productId: '3', overallRating: 4.9, totalReviews: 892, summary: 'The M3 Pro delivers exceptional performance for professionals. Users love the display and build quality.', pros: ['Blazing fast', 'Stunning display', 'Premium build'], cons: ['Expensive'] },
    '4': { productId: '4', overallRating: 4.7, totalReviews: 445, summary: 'Incredible OLED picture quality with deep blacks and vibrant colors. Great for movies and gaming.', pros: ['Amazing picture', 'Low input lag', 'Smart TV features'], cons: ['Risk of burn-in'] },
  },
  brainform: {
    '1': { productId: '1', overallRating: 4.9, totalReviews: 523, summary: 'The holy grail of moisturizers according to users. Exceptional hydration and visible results. Worth the investment.', pros: ['Deep hydration', 'Visible results', 'Luxurious feel'], cons: ['Expensive'] },
    '2': { productId: '2', overallRating: 4.8, totalReviews: 1892, summary: 'A timeless classic fragrance that receives endless compliments. Long-lasting and elegant.', pros: ['Timeless scent', 'Long-lasting', 'Beautiful packaging'], cons: ['Strong projection'] },
    '3': { productId: '3', overallRating: 4.6, totalReviews: 2341, summary: 'Revolutionary styling tool that delivers salon results at home. Users love the versatility and hair protection.', pros: ['Salon-quality results', 'Less heat damage', 'Versatile'], cons: ['Learning curve', 'Heavy'] },
    '4': { productId: '4', overallRating: 4.7, totalReviews: 789, summary: 'The perfect everyday nude lipstick that suits all skin tones. Creamy formula with great longevity.', pros: ['Flattering shade', 'Creamy formula', 'Long-lasting'], cons: ['Liner wears off faster'] },
  },
};
