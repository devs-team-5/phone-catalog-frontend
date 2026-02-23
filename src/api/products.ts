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

export const getProductsByQuery = async (query: string): Promise<Product[]> => {
  const pattern = `%${query}%`;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(
      `name.ilike.${pattern},color.ilike.${pattern},capacity.ilike.${pattern}`,
    )
    .limit(5);

  if (error) {
    console.error('Search error:', error);
    throw new Error(error.message);
  }

  return data ?? [];
};

export const getHotProducts = () => {
  return getProducts().then((products) => {
    return products
      .filter((product) => product.fullPrice > product.price)
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;
        return discountB - discountA;
      })
      .slice(0, 25);
  });
};

export const getNewProducts = () => {
  return getProducts().then((products) => {
    return products
      .filter((product) => product.year === currentYear)
      .slice(0, 25);
  });
};

export const getSuggestedProducts = () => {
  return getProducts().then((products) =>
    [...products].sort(() => 0.5 - Math.random()).slice(0, 25),
  );
};

interface GetProductsParams {
  category?: Categories;
  sort?: 'age' | 'title' | 'price' | string;
  page?: number;
  perPage?: string;
  capacities?: string[];
  years?: string[];
  models?: string[];
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
  capacities = [],
  years = [],
  models = [],
}: GetProductsParams): Promise<ProductsResponse> => {
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (category) {
    query = query.eq('category', category);
  }

  if (capacities.length > 0) {
    query = query.in('capacity', capacities);
  }

  if (years.length > 0) {
    query = query.in('year', years);
  }

  if (models.length > 0) {
    const filterConditions = models
      .map((model) => `itemId.ilike.${model}-%`)
      .join(',');
    query = query.or(filterConditions);
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

export const getFilterOptionsByCategory = async (
  category: Categories,
): Promise<{ capacities: string[]; years: string[]; models: string[] }> => {
  const { data, error } = await supabase
    .from('products')
    .select('capacity, year, itemId')
    .eq('category', category);

  if (error) {
    console.error(
      `Error fetching filter options for category ${category}:`,
      error,
    );
    return { capacities: [], years: [], models: [] };
  }

  const rawCapacities = [...new Set(data.map((item) => item.capacity))].filter(
    Boolean,
  );
  const capacities = rawCapacities.sort((a, b) => {
    const parseCapacity = (cap: string) => {
      const num = parseInt(cap);
      if (cap.toLowerCase().includes('tb')) return num * 1024;
      return num;
    };
    return parseCapacity(a) - parseCapacity(b);
  });

  // Process Years
  const rawYears = [...new Set(data.map((item) => item.year))].filter(Boolean);
  const years = rawYears.sort((a, b) => Number(b) - Number(a)).map(String);

  // Process Models
  const modelMap = new Map<string, number>();
  data.forEach((item) => {
    let modelName = item.itemId;
    const parts = item.itemId.split('-');
    if (parts.length >= 3) {
      modelName = parts.slice(0, -2).join('-');
    }

    const existingYear = modelMap.get(modelName) || 0;
    if (item.year > existingYear) {
      modelMap.set(modelName, item.year);
    }
  });

  const sortedModels = Array.from(modelMap.entries()).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return b[0].localeCompare(a[0]);
  });
  const models = sortedModels.map((model) => model[0]);

  return { capacities, years, models };
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
