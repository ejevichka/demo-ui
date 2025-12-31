import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = '£'): string {
  return `${currency}${price.toFixed(2)}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
