import { supabase } from '@/utils/supabaseClient';
import type { Product } from '@/types/Product';
import type { Categories } from '@/types/Categories';
import type { ProductDetails } from '@/types/ProductDetails';

export const getProducts = () => {
  return supabase
    .from('products')
    .select('*')
    .order('year', { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message);
      }
      return (data as Product[]) || [];
    });
};

export const getProductDetails = (category: Categories, itemId: string) => {
  return supabase
    .from(category)
    .select('*')
    .eq('id', itemId)
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error(`Error fetching ${category} detail:`, error);
        return null;
      }
      return data as ProductDetails;
    });
};

export const getImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.replace(/^(\/)?img\//, '');

  const { data } = supabase.storage
    .from('catalog_images')
    .getPublicUrl(cleanPath);

  return data.publicUrl;
};

export const getHotProducts = () => {
  return getProducts().then((products) => {
    return products.sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;
      return discountB - discountA;
    });
  });
};

export const getNewProducts = () => {
  return getProducts().then((products) => {
    return products.sort((a, b) => {
      const yearA = a.year;
      const yearB = b.year;

      return yearB - yearA;
    });
  });
};
