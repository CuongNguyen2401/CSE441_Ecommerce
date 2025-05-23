import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartItem, CartState} from '../queries/cart/types';

// Define actions
type CartAction =
  | {type: 'ADD_ITEM'; payload: CartItem}
  | {type: 'REMOVE_ITEM'; payload: number}
  | {type: 'UPDATE_ITEM_QUANTITY'; payload: {id: number; quantity: number}}
  | {type: 'CLEAR_CART'}
  | {type: 'APPLY_PROMO'; payload: {code: string; discount: number}}
  | {type: 'REMOVE_PROMO'}
  | {type: 'SET_CART'; payload: CartState};

// Define initial state
const initialState: CartState = {
  items: [],
  subtotal: 0,
  shippingCost: 0,
  tax: 0,
  promoDiscount: 0,
  total: 0,
};

// Define the reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId,
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {...item, quantity: item.quantity + action.payload.quantity}
            : item,
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }

      // Recalculate state
      return calculateCartState({...state, items: newItems});
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return calculateCartState({...state, items: newItems});
    }

    case 'UPDATE_ITEM_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? {...item, quantity: action.payload.quantity}
          : item,
      );
      return calculateCartState({...state, items: newItems});
    }

    case 'CLEAR_CART':
      return {...initialState};

    case 'APPLY_PROMO':
      return calculateCartState({
        ...state,
        promoCode: action.payload.code,
        promoDiscount: action.payload.discount,
      });

    case 'REMOVE_PROMO':
      return calculateCartState({
        ...state,
        promoCode: undefined,
        promoDiscount: 0,
      });

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartState = (state: CartState): CartState => {
  // Calculate subtotal
  const subtotal = state.items.reduce(
    (total, item) => total + (item.salePrice || item.price) * item.quantity,
    0,
  );

  // Calculate shipping (free over $100)
  const shippingCost = subtotal > 100 ? 0 : 9.99;

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085;

  // Calculate total
  const total = subtotal + shippingCost + tax - state.promoDiscount;

  return {
    ...state,
    subtotal,
    shippingCost,
    tax,
    total,
  };
};

// Create context
interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string, discount: number) => void;
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider
export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData) as CartState;
          dispatch({type: 'SET_CART', payload: calculateCartState(parsedCart)});
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    };

    saveCart();
  }, [state]);

  // Actions
  const addItem = (item: CartItem) => {
    dispatch({type: 'ADD_ITEM', payload: item});
  };

  const removeItem = (id: number) => {
    dispatch({type: 'REMOVE_ITEM', payload: id});
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: {id, quantity},
    });
  };

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'});
  };

  const applyPromo = (code: string, discount: number) => {
    dispatch({
      type: 'APPLY_PROMO',
      payload: {code, discount},
    });
  };

  const removePromo = () => {
    dispatch({type: 'REMOVE_PROMO'});
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    applyPromo,
    removePromo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Create custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
