export const Language = {
  EN: 'en',
  UA: 'ua',
} as const;

export type Language = (typeof Language)[keyof typeof Language];
