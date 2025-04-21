export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	stock: number;
	rating: number;
	reviewCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductsResponse {
	content: Product[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
}

export interface ProductFilter {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	sortBy?: 'price' | 'rating' | 'newest';
	sortDirection?: 'asc' | 'desc';
	page?: number;
	size?: number;
}
