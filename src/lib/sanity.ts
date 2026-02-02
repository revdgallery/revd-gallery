import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Environment variables - set these in .env.local
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// For mutations (requires write token)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Artwork {
  _id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  description?: string;
  image: SanityImage;
  framePosition: {
    room: number;
    frame: number;
  };
}

export interface Exhibition {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  coverImage?: SanityImage;
  artworks: Artwork[];
  rooms: GalleryRoom[];
}

export interface GalleryRoom {
  _key: string;
  name: string;
  modelFile?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  frames: FrameConfig[];
}

export interface FrameConfig {
  _key: string;
  frameId: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: { width: number; height: number };
  artwork?: Artwork;
}

export interface Bulletin {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  poster: SanityImage;
  publishDate: string;
  isPublished: boolean;
}

export interface ArchiveItem {
  _id: string;
  exhibition: Exhibition;
  coverImage: SanityImage;
  catalogPdf?: {
    asset: {
      url: string;
    };
  };
  photos: SanityImage[];
  archivedDate: string;
}

export interface HomepageContent {
  _id: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  aboutText?: any[]; // Portable text
  featuredExhibition?: Exhibition;
  featuredBulletins: Bulletin[];
}
