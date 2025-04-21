export interface Product {
	id: number;
	name: string;
	price: number;
	discountPrice: number;
	rating: number;
	reviewCount: number;
	description: string;
	features: string[];
	specifications: {
		name: string;
		value: string;
	}[];
	images: string[];
	colors: string[];
	inStock: boolean;
}

interface RelatedProduct {
	id: number;
	name: string;
	price: number;
	image: string;
}

export interface Category {
	id?: number;
	name: any;
	icon?: string;
}

interface FeaturedProduct {
	id: number;
	name: string;
	price: number;
	image: string;
}

interface Promotion {
	id: number;
	title: string;
	description: string;
	image: string;
}