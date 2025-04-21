import { Product } from "services/product-service/helpers";

export interface CartItem {
	id: number;
	product: Product;
	quantity: number;
	price: number; // Price at the time of adding to cart
}

export interface Cart {
	id: number;
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
}