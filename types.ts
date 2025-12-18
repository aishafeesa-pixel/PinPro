
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export type PlanType = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  plan: PlanType;
  dailyPinLimit: number;
  pinsUsedToday: number;
  isBanned: boolean;
}

export type Resolution = '1000x1500' | '1000x1000' | '1080x1920';
export type ImageQuality = '1K' | '2K';
export type CreativeStyle = 'photographic' | 'cinematic' | 'digital_art' | '3d_render' | 'neon_cyber' | 'minimalist_vector';

export interface PinDesign {
  id: string;
  userId: string;
  title: string;
  imageUrl: string;
  resolution: Resolution;
  prompt: string;
  createdAt: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  maintenanceMode: boolean;
  allowFreeTrial: boolean;
  seo: SeoSettings;
}

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'ar' | 'ur';
