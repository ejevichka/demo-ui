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

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: '1', text: 'How to choose a coffee machine for home?' },
  { id: '2', text: 'What is the difference between automatic and capsule machines?' },
  { id: '3', text: 'Compare KRUPS Essential and KRUPS Intuition' },
  { id: '4', text: 'How to properly maintain a coffee machine?' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Headphones Sony WH-CH720N White',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    oldPrice: 70.00,
    newPrice: 42.00,
    currency: '£',
    discount: '-40%',
  },
  {
    id: '2',
    title: 'Smart Fitness Bracelet Xiaomi Mi Band 8 Black',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
    oldPrice: 70.00,
    newPrice: 42.00,
    currency: '£',
    discount: '-40%',
  },
  {
    id: '3',
    title: 'Travel Hair Dryer Philips BHD006/00 Grey',
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop',
    oldPrice: 70.00,
    newPrice: 42.00,
    currency: '£',
    discount: '-40%',
  },
  {
    id: '4',
    title: 'Capsule Coffee Machine Nespresso Vertuo Next Black',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
    oldPrice: 70.00,
    newPrice: 42.00,
    currency: '£',
    discount: '-40%',
  },
];

export function getTheme(themeName: string): ThemeConfig {
  return themes[themeName] || themes.brainform;
}
