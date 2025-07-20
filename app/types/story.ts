// Reusable types for Story and Product modules

export type ProductImage = {
  url?: string;
  src?: string;
  originalSrc?: string;
};

export type ProductVariant = {
  price?: string;
};

export type Product = {
  id: string;
  title: string;
  handle?: string;
  vendor?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  descriptionHtml?: string;
};

export type StoryPayload = {
  title: string;
  content: string;
  image: string;
  video: string;
  buttonLabel: string;
  buttonLink: string;
  visibility: 'Active' | 'Inactive';
};
