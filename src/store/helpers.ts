import { Cart } from "services/cart-service/helpers";
import { Product, ProductFilter } from "services/product-service/helpers";


export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
}

export interface AuthState {
	resetPassword: (email: string) => Promise<void>;
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;

	// Actions
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, firstName: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	clearError: () => void;
}

export interface CartState {
	cart: Cart | null;
	isLoading: boolean;
	error: string | null;

	// Actions
	fetchCart: () => Promise<void>;
	addToCart: (productId: number, quantity?: number) => Promise<void>;
	updateCartItem: (itemId: number, quantity: number) => Promise<void>;
	removeFromCart: (itemId: number) => Promise<void>;
	clearCart: () => Promise<void>;
	applyCoupon: (couponCode: string) => Promise<void>;
	removeCoupon: () => Promise<void>;
	clearError: () => void;
}

export interface ProductState {
	products: Product[];
	featuredProducts: Product[];
	newArrivals: Product[];
	currentProduct: Product | null;
	totalElements: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	filter: ProductFilter;
	isLoading: boolean;
	error: string | null;

	// Actions
	fetchProducts: (filter?: ProductFilter) => Promise<void>;
	fetchProductById: (id: number) => Promise<void>;
	fetchFeaturedProducts: () => Promise<void>;
	fetchNewArrivals: () => Promise<void>;
	searchProducts: (query: string) => Promise<void>;
	fetchProductsByCategory: (category: string) => Promise<void>;
	setFilter: (filter: Partial<ProductFilter>) => void;
	clearFilter: () => void;
	nextPage: () => Promise<void>;
	prevPage: () => Promise<void>;
	goToPage: (page: number) => Promise<void>;
	clearError: () => void;
}
