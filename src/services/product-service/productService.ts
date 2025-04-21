import api from '../api';
import {Product, ProductFilter, ProductsResponse} from './helpers';

export const productService = {
  getProducts: async (filter: ProductFilter = {}) => {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'newest',
      sortDirection = 'desc',
      page = 0,
      size = 10,
    } = filter;

    const params = {
      page,
      size,
      sortBy,
      sortDirection,
      ...(category && { category }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(search && { search }),
    };

    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string, page = 0, size = 10) => {
    return productService.getProducts({
      category,
      page,
      size,
    });
  },

  searchProducts: async (query: string, page = 0, size = 10) => {
    return productService.getProducts({
      search: query,
      page,
      size,
    });
  },

  getFeaturedProducts: async () => {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  },

  getNewArrivals: async () => {
    return productService.getProducts({
      sortBy: 'newest',
      size: 10,
    });
  },
};
