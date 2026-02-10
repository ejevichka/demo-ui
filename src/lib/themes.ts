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
      title: 'KRUPS Sensation EA910810',
      description: 'Fully automatic espresso machine with milk frother, 5 drinks, touch interface',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop',
      oldPrice: 879.00,
      newPrice: 529.00,
      currency: '$',
      discount: '-40%',
      reviewsCount: 120,
      rating: 5.0,
    },
    {
      id: '2',
      title: 'KRUPS Intuition Preference+ EA875E10',
      description: 'Premium automatic coffee machine with color touch display and milk system',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
      oldPrice: 1649.00,
      newPrice: 989.00,
      currency: '$',
      discount: '-40%',
      reviewsCount: 86,
      rating: 5.0,
    },
    {
      id: '3',
      title: 'KRUPS Evidence Hot & Cold EA898GF0',
      description: 'Automatic coffee machine with hot and cold drink options, 12 recipes',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
      oldPrice: 1209.00,
      newPrice: 879.00,
      currency: '$',
      discount: '-27%',
      reviewsCount: 25,
      rating: 5.0,
    },
    {
      id: '4',
      title: 'KRUPS Essential EA810870',
      description: 'Compact automatic espresso machine, perfect for small spaces',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop',
      oldPrice: 659.00,
      newPrice: 389.00,
      currency: '$',
      discount: '-41%',
      reviewsCount: 142,
      rating: 5.0,
    },
  ],
  bluemarket: [
    {
      id: '1',
      title: 'Demix Insulated Winter Jacket',
      description: 'Warm insulated jacket for outdoor sports and everyday wear',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
      oldPrice: 99.00,
      newPrice: 65.00,
      currency: '$',
      discount: '-34%',
      reviewsCount: 423,
      rating: 4.7,
    },
    {
      id: '2',
      title: 'Nike Dri-FIT Training T-Shirt',
      description: 'Breathable performance t-shirt with moisture-wicking technology',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      oldPrice: 49.00,
      newPrice: 35.00,
      currency: '$',
      discount: '-29%',
      reviewsCount: 856,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'ASICS Gel-Kayano 30 Running Shoes',
      description: 'Premium running shoes with advanced cushioning and stability',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      oldPrice: 159.00,
      newPrice: 129.00,
      currency: '$',
      discount: '-19%',
      reviewsCount: 1243,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Puma Classic Track Suit',
      description: 'Comfortable track suit for training and casual wear',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
      oldPrice: 119.00,
      newPrice: 89.00,
      currency: '$',
      discount: '-25%',
      reviewsCount: 567,
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
      title: 'Estée Lauder Advanced Night Repair Serum 50ml',
      description: 'Synchronized Multi-Recovery Complex with Hyaluronic Acid & Peptides',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
      oldPrice: 115.00,
      newPrice: 98.00,
      currency: '$',
      discount: '-15%',
      reviewsCount: 2341,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'Estée Lauder Double Wear Foundation',
      description: 'Stay-in-Place Makeup SPF 10, 24-hour wear, flawless coverage',
      image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=300&h=300&fit=crop',
      oldPrice: 52.00,
      newPrice: 48.00,
      currency: '$',
      discount: '-8%',
      reviewsCount: 3892,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Estée Lauder Revitalizing Supreme+ Moisturizer',
      description: 'Global Anti-Aging Power Soft Crème with plant-based extracts',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop',
      oldPrice: 115.00,
      newPrice: 98.00,
      currency: '$',
      discount: '-15%',
      reviewsCount: 1523,
      rating: 4.7,
    },
    {
      id: '4',
      title: 'Estée Lauder Pure Color Envy Lipstick',
      description: 'Sculpting Lipstick with intense color and creamy formula',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      oldPrice: 42.00,
      newPrice: 36.00,
      currency: '$',
      discount: '-14%',
      reviewsCount: 987,
      rating: 4.6,
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
      { id: 'r1', productId: '1', author: 'Emma Wilson', rating: 5, text: 'The KRUPS Sensation makes incredible espresso! Touch interface is very intuitive.', date: '2025-01-15', verified: true },
      { id: 'r2', productId: '1', author: 'James Chen', rating: 5, text: 'Perfect milk froth every time. The 5 drink options cover everything I need.', date: '2025-01-10', verified: true },
      { id: 'r3', productId: '1', author: 'Sophie Martin', rating: 5, text: 'Easy to clean and maintain. Automatic cleaning is a huge time saver!', date: '2025-01-05', verified: false },
    ],
    '2': [
      { id: 'r4', productId: '2', author: 'Michael Brown', rating: 5, text: 'The Intuition Preference+ is a premium machine. Color display makes operation a breeze!', date: '2025-01-12', verified: true },
      { id: 'r5', productId: '2', author: 'Anna Schmidt', rating: 5, text: 'Exceptional coffee quality. The milk system produces perfect lattes every time.', date: '2025-01-08', verified: true },
    ],
    '3': [
      { id: 'r6', productId: '3', author: 'David Lee', rating: 5, text: 'Hot & Cold drinks are amazing! Perfect for summer iced coffees.', date: '2025-01-14', verified: true },
      { id: 'r7', productId: '3', author: 'Lisa Park', rating: 5, text: 'Love the 12 drink recipes. The Evidence never disappoints!', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r8', productId: '4', author: 'Robert Taylor', rating: 5, text: 'Compact design perfect for small kitchens. Great value for the price!', date: '2025-01-13', verified: true },
      { id: 'r9', productId: '4', author: 'Maria Garcia', rating: 5, text: 'The Essential delivers consistently good espresso. Easy to use daily.', date: '2025-01-09', verified: false },
    ],
  },
  bluemarket: {
    '1': [
      { id: 'r10', productId: '1', author: 'Alex Winter', rating: 5, text: 'Perfect jacket for cold weather! Keeps me warm during morning runs.', date: '2025-01-15', verified: true },
      { id: 'r11', productId: '1', author: 'Sarah Outdoor', rating: 5, text: 'Great quality for the price. Water resistant and very comfortable.', date: '2025-01-12', verified: true },
      { id: 'r12', productId: '1', author: 'Mike Sports', rating: 4, text: 'Nice insulation but runs a bit large. Order one size down!', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r13', productId: '2', author: 'Chris Gym', rating: 5, text: 'Best training shirt I own! Dri-FIT really works during intense workouts.', date: '2025-01-14', verified: true },
      { id: 'r14', productId: '2', author: 'Jenny Fitness', rating: 4, text: 'Comfortable fit and great for the gym. Fabric feels premium.', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r15', productId: '3', author: 'Tom Runner', rating: 5, text: 'Best running shoes I have ever worn! Amazing cushioning and support.', date: '2025-01-13', verified: true },
      { id: 'r16', productId: '3', author: 'Kate Marathon', rating: 5, text: 'Perfect for long distances. My knees thank me after every run.', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r17', productId: '4', author: 'Dan Active', rating: 5, text: 'Comfortable track suit for training and casual wear. Great value!', date: '2025-01-15', verified: true },
      { id: 'r18', productId: '4', author: 'Amy Sport', rating: 4, text: 'Nice material and classic Puma style. Perfect for the gym.', date: '2025-01-09', verified: true },
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
      { id: 'r28', productId: '1', author: 'Skincare Expert', rating: 5, text: 'The Advanced Night Repair is a game changer! My skin looks more radiant and youthful.', date: '2025-01-15', verified: true },
      { id: 'r29', productId: '1', author: 'Beauty Blogger', rating: 5, text: 'Worth every penny. My fine lines have visibly reduced after 4 weeks.', date: '2025-01-12', verified: true },
      { id: 'r30', productId: '1', author: 'Night Owl', rating: 4, text: 'Love how it absorbs quickly. Wake up with glowing skin every morning!', date: '2025-01-08', verified: false },
    ],
    '2': [
      { id: 'r31', productId: '2', author: 'Makeup Artist', rating: 5, text: 'Best foundation for all-day wear! Stays flawless through anything.', date: '2025-01-14', verified: true },
      { id: 'r32', productId: '2', author: 'Busy Professional', rating: 5, text: 'Finally a foundation that lasts my 12-hour workdays. No touch-ups needed!', date: '2025-01-10', verified: true },
    ],
    '3': [
      { id: 'r33', productId: '3', author: 'Skincare Lover', rating: 5, text: 'This moisturizer is so hydrating! Perfect for my combination skin.', date: '2025-01-13', verified: true },
      { id: 'r34', productId: '3', author: 'Anti-Aging Fan', rating: 4, text: 'Great for mature skin. Firming effect is noticeable after a month.', date: '2025-01-11', verified: true },
    ],
    '4': [
      { id: 'r35', productId: '4', author: 'Lipstick Collector', rating: 5, text: 'The formula is so creamy and pigmented. Beautiful shade range!', date: '2025-01-15', verified: true },
      { id: 'r36', productId: '4', author: 'Classic Beauty', rating: 5, text: 'Elegant packaging, gorgeous colors. My go-to for special occasions.', date: '2025-01-09', verified: true },
    ],
  },
};

// Mock review summaries by theme and product ID
export const reviewSummariesByTheme: Record<ThemeName, Record<string, ReviewSummary>> = {
  brownmarket: {
    '1': { productId: '1', overallRating: 5.0, totalReviews: 120, summary: 'The KRUPS Sensation EA910810 delivers exceptional espresso with a user-friendly touch interface. Customers praise the milk frothing system and automatic cleaning feature.', pros: ['Touch interface', 'Perfect milk foam', 'Easy cleaning'], cons: ['Slightly noisy'] },
    '2': { productId: '2', overallRating: 5.0, totalReviews: 86, summary: 'Premium coffee experience with the Intuition Preference+. The color display and advanced milk system make barista-quality drinks effortless.', pros: ['Color touch display', 'Premium milk system', 'Exceptional quality'], cons: ['Higher price point'] },
    '3': { productId: '3', overallRating: 5.0, totalReviews: 25, summary: 'The Evidence Hot & Cold offers unique versatility with both hot and cold drink options. 12 recipes cover every coffee preference.', pros: ['Hot & cold drinks', '12 recipes', 'Innovative design'], cons: ['Learning curve'] },
    '4': { productId: '4', overallRating: 5.0, totalReviews: 142, summary: 'Compact yet powerful, the KRUPS Essential is perfect for smaller spaces without compromising on coffee quality.', pros: ['Compact size', 'Great value', 'Consistent quality'], cons: ['Limited drink options'] },
  },
  bluemarket: {
    '1': { productId: '1', overallRating: 4.7, totalReviews: 423, summary: 'The Demix insulated jacket provides excellent warmth for outdoor sports and everyday wear. Great value for money.', pros: ['Warm insulation', 'Water resistant', 'Good value'], cons: ['Runs slightly large'] },
    '2': { productId: '2', overallRating: 4.8, totalReviews: 856, summary: 'Nike Dri-FIT technology keeps you cool and dry during intense workouts. Premium feel and comfortable fit.', pros: ['Moisture-wicking', 'Premium feel', 'Comfortable fit'], cons: ['Premium price'] },
    '3': { productId: '3', overallRating: 4.9, totalReviews: 1243, summary: 'ASICS Gel-Kayano 30 is praised as one of the best running shoes for stability and cushioning. Perfect for long distances.', pros: ['Amazing cushioning', 'Great stability', 'Durable'], cons: ['Break-in period needed'] },
    '4': { productId: '4', overallRating: 4.6, totalReviews: 567, summary: 'Classic Puma track suit that is comfortable for both training and casual wear. Great quality for the price.', pros: ['Comfortable fit', 'Classic style', 'Good quality'], cons: ['Limited color options'] },
  },
  redmarket: {
    '1': { productId: '1', overallRating: 4.8, totalReviews: 1243, summary: 'Industry-leading noise cancellation with exceptional sound quality. Users praise the comfort and battery life.', pros: ['Best-in-class ANC', 'Amazing sound', 'Long battery life'], cons: ['Premium price'] },
    '2': { productId: '2', overallRating: 4.5, totalReviews: 567, summary: 'Feature-rich smartwatch with accurate health tracking and beautiful display. Great for fitness enthusiasts.', pros: ['Accurate tracking', 'Beautiful display', 'Smooth interface'], cons: ['Battery life'] },
    '3': { productId: '3', overallRating: 4.9, totalReviews: 892, summary: 'The M3 Pro delivers exceptional performance for professionals. Users love the display and build quality.', pros: ['Blazing fast', 'Stunning display', 'Premium build'], cons: ['Expensive'] },
    '4': { productId: '4', overallRating: 4.7, totalReviews: 445, summary: 'Incredible OLED picture quality with deep blacks and vibrant colors. Great for movies and gaming.', pros: ['Amazing picture', 'Low input lag', 'Smart TV features'], cons: ['Risk of burn-in'] },
  },
  brainform: {
    '1': { productId: '1', overallRating: 4.9, totalReviews: 2341, summary: 'The iconic Advanced Night Repair serum is praised for visible anti-aging results. Users love the lightweight texture and how it transforms skin overnight.', pros: ['Visible results', 'Lightweight texture', 'Reduces fine lines'], cons: ['Premium price'] },
    '2': { productId: '2', overallRating: 4.8, totalReviews: 3892, summary: 'Double Wear is the gold standard for long-wearing foundation. Users praise its flawless finish that lasts all day without touch-ups.', pros: ['24-hour wear', 'Flawless finish', 'Great shade range'], cons: ['Can feel heavy'] },
    '3': { productId: '3', overallRating: 4.7, totalReviews: 1523, summary: 'A luxurious moisturizer that delivers visible firming and lifting. Users appreciate the rich texture and anti-aging benefits.', pros: ['Deep hydration', 'Firming effect', 'Elegant packaging'], cons: ['Rich texture not for oily skin'] },
    '4': { productId: '4', overallRating: 4.6, totalReviews: 987, summary: 'A creamy, pigmented lipstick with beautiful color payoff. Users love the comfortable wear and elegant packaging.', pros: ['Creamy formula', 'Rich pigment', 'Long-lasting'], cons: ['Needs lip liner'] },
  },
};
