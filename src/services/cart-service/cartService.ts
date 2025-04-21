import api from '../api';
import {Cart} from "./helpers";

export const cartService = {

	getCart: async () => {
		const response = await api.get<Cart>('/cart');
		return response.data;
	},

	addToCart: async (productId: number, quantity: number = 1) => {
		const response = await api.post<Cart>('/cart/items', {
			productId,
			quantity,
		});
		return response.data;
	},

	updateCartItem: async (itemId: number, quantity: number) => {
		const response = await api.put<Cart>(`/cart/items/${itemId}`, {
			quantity,
		});
		return response.data;
	},

	removeFromCart: async (itemId: number) => {
		const response = await api.delete<Cart>(`/cart/items/${itemId}`);
		return response.data;
	},

	clearCart: async () => {
		const response = await api.delete<Cart>('/cart');
		return response.data;
	},

	applyCoupon: async (couponCode: string) => {
		const response = await api.post<Cart>('/cart/coupon', {
			couponCode,
		});
		return response.data;
	},

	removeCoupon: async () => {
		const response = await api.delete<Cart>('/cart/coupon');
		return response.data;
	},
};