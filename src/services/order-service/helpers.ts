import {Product} from "../product-service/productService";
import {OrderStatus, PaymentMethod, PaymentStatus} from "./types";

export interface OrderItem {
	id: number;
	product: Product;
	quantity: number;
	price: number; // Price at the time of ordering
}

export interface Address {
	id?: number;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	isDefault?: boolean;
}

export interface Order {
	id: number;
	orderNumber: string;
	items: OrderItem[];
	totalItems: number;
	subtotal: number;
	shippingCost: number;
	tax: number;
	discount: number;
	totalPrice: number;
	shippingAddress: Address;
	billingAddress: Address;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	paymentMethod: PaymentMethod;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface OrdersResponse {
	content: Order[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
}

export interface CreateOrderRequest {
	shippingAddressId?: number;
	billingAddressId?: number;
	shippingAddress?: Address;
	billingAddress?: Address;
	paymentMethod: PaymentMethod;
	notes?: string;
	useCartItems: boolean;
}