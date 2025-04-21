import { create } from 'zustand';
import { productService } from '../services';
import { ProductState } from "./helpers";

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    featuredProducts: [],
    newArrivals: [],
    currentProduct: null,
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    filter: {},
    isLoading: false,
    error: null,

    fetchProducts: async (filter) => {
        try {
            set({isLoading: true, error: null});

            // Merge with existing filter if provided
            const currentFilter = filter ? {...get().filter, ...filter} : get().filter;

            const response = await productService.getProducts(currentFilter);

            set({
                products: response.content,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                currentPage: response.number,
                pageSize: response.size,
                filter: currentFilter,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch products',
            });
        }
    },

    fetchProductById: async (id) => {
        try {
            set({isLoading: true, error: null});
            const product = await productService.getProductById(id);
            set({currentProduct: product, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch product',
            });
        }
    },

    fetchFeaturedProducts: async () => {
        try {
            set({isLoading: true, error: null});
            const products = await productService.getFeaturedProducts();
            set({featuredProducts: products, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch featured products',
            });
        }
    },

    fetchNewArrivals: async () => {
        try {
            set({isLoading: true, error: null});
            const response = await productService.getNewArrivals();
            set({newArrivals: response.content, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch new arrivals',
            });
        }
    },

    searchProducts: async (query) => {
        try {
            set({isLoading: true, error: null});
            const response = await productService.searchProducts(query);
            set({
                products: response.content,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                currentPage: response.number,
                pageSize: response.size,
                filter: {...get().filter, search: query},
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to search products',
            });
        }
    },

    fetchProductsByCategory: async (category) => {
        try {
            set({isLoading: true, error: null});
            const response = await productService.getProductsByCategory(category);
            set({
                products: response.content,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                currentPage: response.number,
                pageSize: response.size,
                filter: {...get().filter, category},
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch products by category',
            });
        }
    },

    setFilter: (filter) => {
        set({filter: {...get().filter, ...filter}});
    },

    clearFilter: () => {
        set({filter: {}});
    },

    nextPage: async () => {
        const {currentPage, totalPages, filter} = get();
        if (currentPage < totalPages - 1) {
            await get().fetchProducts({...filter, page: currentPage + 1});
        }
    },

    prevPage: async () => {
        const {currentPage, filter} = get();
        if (currentPage > 0) {
            await get().fetchProducts({...filter, page: currentPage - 1});
        }
    },

    goToPage: async (page) => {
        const {totalPages, filter} = get();
        if (page >= 0 && page < totalPages) {
            await get().fetchProducts({...filter, page});
        }
    },

    clearError: () => {
        set({error: null});
    },
}));
