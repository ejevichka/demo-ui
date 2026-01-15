import type { ThemeConfig, Product, SuggestedQuestion, ThemeName } from '@/types';

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
    },
    {
      id: '2',
      title: 'KRUPS Evidence One Automatic Coffee Machine',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
      oldPrice: 749.00,
      newPrice: 599.00,
      currency: '€',
      discount: '-20%',
    },
    {
      id: '3',
      title: 'KRUPS Nespresso Vertuo Next Capsule Machine',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
      oldPrice: 199.00,
      newPrice: 149.00,
      currency: '€',
      discount: '-25%',
    },
    {
      id: '4',
      title: 'KRUPS Precision Coffee Grinder GVX242',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop',
      oldPrice: 89.00,
      newPrice: 69.00,
      currency: '€',
      discount: '-22%',
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
    },
    {
      id: '2',
      title: 'Ultralight Hiking Backpack 40L',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      oldPrice: 120.00,
      newPrice: 89.00,
      currency: '£',
      discount: '-26%',
    },
    {
      id: '3',
      title: 'Mountain Bike Cannondale Trail 6',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop',
      oldPrice: 899.00,
      newPrice: 699.00,
      currency: '£',
      discount: '-22%',
    },
    {
      id: '4',
      title: 'Climbing Harness Petzl Corax',
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=300&h=300&fit=crop',
      oldPrice: 75.00,
      newPrice: 59.00,
      currency: '£',
      discount: '-21%',
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
    },
    {
      id: '2',
      title: 'Smart Watch Samsung Galaxy Watch 6',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
      oldPrice: 329.00,
      newPrice: 249.00,
      currency: '£',
      discount: '-24%',
    },
    {
      id: '3',
      title: 'MacBook Pro 14" M3 Pro 512GB',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      oldPrice: 1999.00,
      newPrice: 1799.00,
      currency: '£',
      discount: '-10%',
    },
    {
      id: '4',
      title: 'LG OLED TV 55" C3 Series 4K',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
      oldPrice: 1299.00,
      newPrice: 999.00,
      currency: '£',
      discount: '-23%',
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
    },
    {
      id: '2',
      title: 'Chanel No. 5 Eau de Parfum 100ml',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
      oldPrice: 135.00,
      newPrice: 108.00,
      currency: '£',
      discount: '-20%',
    },
    {
      id: '3',
      title: 'Dyson Airwrap Complete Styler',
      image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop',
      oldPrice: 479.00,
      newPrice: 399.00,
      currency: '£',
      discount: '-17%',
    },
    {
      id: '4',
      title: 'Charlotte Tilbury Pillow Talk Lipstick Set',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      oldPrice: 65.00,
      newPrice: 52.00,
      currency: '£',
      discount: '-20%',
    },
  ],
};

// Legacy export for backward compatibility
export const mockProducts: Product[] = mockProductsByTheme.redmarket;

export function getTheme(themeName: string): ThemeConfig {
  return themes[themeName] || themes.brainform;
}
