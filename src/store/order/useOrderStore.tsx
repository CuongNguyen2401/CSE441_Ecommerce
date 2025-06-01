import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OrderItem, OrderPayload} from 'queries/order';

interface OrderStore extends OrderPayload {
  subtotal: number;
  addItem: (item: OrderItem) => void;
  removeItem: (index: number) => void;
  updateItemQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
}

const calculateSubtotal = (items: OrderItem[]) => {
  return items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      customerName: '',
      email: '',
      phoneNumber: '',
      address: '',
      note: '',
      couponCode: '',
      orderItems: [],
      subtotal: 0,

      addItem: (item: OrderItem) => {
        const orderItems = [...get().orderItems, item];
        const subtotal = calculateSubtotal(orderItems);
        set({orderItems, subtotal});
      },

      removeItem: (index: number) => {
        const orderItems = get().orderItems.filter((_, i) => i !== index);
        const subtotal = calculateSubtotal(orderItems);
        set({orderItems, subtotal});
      },

      updateItemQuantity: (index: number, quantity: number) => {
        const orderItems = get().orderItems.map((item, i) =>
          i === index ? {...item, quantity} : item,
        );
        const subtotal = calculateSubtotal(orderItems);
        set({orderItems, subtotal});
      },

      clearCart: () => {
        set({
          orderItems: [],
          subtotal: 0,
          customerName: '',
          email: '',
          phoneNumber: '',
          address: '',
          note: '',
          couponCode: '',
        });
      },
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage as StateStorage),
    },
  ),
);
