import { supabase } from '@/utils/supabaseClient';
import type { Product } from '@/types/Product';
import type { Categories } from '@/types/Categories';
import type { ProductDetails } from '@/types/ProductDetails';

const currentYear = 2025;

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

export const getProductById = (id: string) => {
  return supabase
    .from('products')
    .select('*')
    .eq('itemId', id)
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error('Error fetching product:', error);
        throw new Error(error.message);
      }
      return data as Product;
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
    return products
      .filter((product) => product.fullPrice > product.price)
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;
        return discountB - discountA;
      });
  });
};

export const getNewProducts = () => {
  return getProducts().then((products) => {
    return products.filter((product) => product.year === currentYear);
  });
};

interface GetProductsParams {
  category?: Categories;
  sort?: 'age' | 'title' | 'price' | string;
  page?: number;
  perPage?: string;
}

interface ProductsResponse {
  products: Product[];
  totalCount: number;
}

export const getProductsWithParams = async ({
  category,
  sort = 'age',
  page = 1,
  perPage = '16',
}: GetProductsParams): Promise<ProductsResponse> => {
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (category) {
    query = query.eq('category', category);
  }

  switch (sort) {
    case 'title':
      query = query.order('name', { ascending: true });
      break;
    case 'price':
    case 'cheapest':
      query = query.order('price', { ascending: true });
      break;
    case 'expensive':
      query = query.order('price', { ascending: false });
      break;
    case 'age':
    default:
      query = query.order('year', { ascending: false });
      break;
  }

  if (perPage !== 'all') {
    const itemsPerPage = Number(perPage);

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error(error.message);
  }

  return {
    products: (data as Product[]) || [],
    totalCount: count || 0,
  };
};

export const getProductsCountByCategory = async (
  category: Categories,
): Promise<number> => {
  const { error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category', category);

  if (error) {
    console.error(`Error fetching count for category ${category}:`, error);
    throw new Error(error.message);
  }

  return count || 0;
};
