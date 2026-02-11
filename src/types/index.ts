// Theme types
export type ThemeName = 'brainform' | 'bluemarket' | 'redmarket' | 'brownmarket';

export interface ThemeConfig {
  id: ThemeName;
  name: string;
  storeName: string;
  logoIcon: string;
  navItems: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroLabel?: string;
  isDark: boolean;
}

// Product types
export interface Product {
  id: string;
  title: string;
  image: string;
  images?: string[]; // Additional images for gallery
  oldPrice: number;
  newPrice: number;
  currency: string;
  discount?: string;
  description?: string;
  availability?: boolean;
  reviewsCount?: number;
  rating?: number; // 1-5
}

// Review types
export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  text: string;
  date: string;
  verified?: boolean;
}

export interface ReviewSummary {
  productId: string;
  overallRating: number;
  totalReviews: number;
  summary: string;
  pros: string[];
  cons: string[];
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  timestamp: Date;
  isStreaming?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// AI Assistant state
export interface AIAssistantState {
  isOpen: boolean;
  messages: ChatMessage[];
  history: ChatSession[];
  sidebarExpanded: boolean;
  isLoading: boolean;
}

// API types
export interface ChatRequest {
  message: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  theme?: ThemeName;
}

export interface ChatResponse {
  message: string;
  products?: Product[];
}
