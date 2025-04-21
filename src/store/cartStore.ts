import {create} from 'zustand';
import {CartState} from "./helpers";
import { cartService } from 'services/cart-service/cartService';



export const useCartStore = create<CartState>((set, get) => ({
    cart: null,
    isLoading: false,
    error: null,

    fetchCart: async () => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.getCart();
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch cart',
            });
        }
    },

    addToCart: async (productId, quantity = 1) => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.addToCart(productId, quantity);
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to add item to cart',
            });
            throw error;
        }
    },

    updateCartItem: async (itemId, quantity) => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.updateCartItem(itemId, quantity);
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to update cart item',
            });
            throw error;
        }
    },

    removeFromCart: async (itemId) => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.removeFromCart(itemId);
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to remove item from cart',
            });
            throw error;
        }
    },

    clearCart: async () => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.clearCart();
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to clear cart',
            });
            throw error;
        }
    },

    applyCoupon: async (couponCode) => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.applyCoupon(couponCode);
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to apply coupon',
            });
            throw error;
        }
    },

    removeCoupon: async () => {
        try {
            set({isLoading: true, error: null});
            const cart = await cartService.removeCoupon();
            set({cart, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to remove coupon',
            });
            throw error;
        }
    },

    clearError: () => {
        set({error: null});
    },
}));