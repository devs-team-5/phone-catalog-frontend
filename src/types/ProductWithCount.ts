import type { Product } from './Product';

export type ProductWithCount = Product & {
  count: number;
};
