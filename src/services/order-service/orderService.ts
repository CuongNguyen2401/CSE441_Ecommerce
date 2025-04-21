import api from '../api';
import {Address, CreateOrderRequest, Order, OrdersResponse} from './helpers';

export const orderService = {
    createOrder: async (orderData: CreateOrderRequest) => {
        const response = await api.post<Order>('/orders', orderData);
        return response.data;
    },

    getOrders: async (page = 0, size = 10) => {
        const response = await api.get<OrdersResponse>('/orders', {
            params: {page, size},
        });
        return response.data;
    },

    getOrderById: async (id: number) => {
        const response = await api.get<Order>(`/orders/${id}`);
        return response.data;
    },

    cancelOrder: async (id: number) => {
        const response = await api.post<Order>(`/orders/${id}/cancel`);
        return response.data;
    },

    getAddresses: async () => {
        const response = await api.get<Address[]>('/user/addresses');
        return response.data;
    },

    addAddress: async (address: Address) => {
        const response = await api.post<Address>('/user/addresses', address);
        return response.data;
    },

    updateAddress: async (id: number, address: Address) => {
        const response = await api.put<Address>(`/user/addresses/${id}`, address);
        return response.data;
    },

    deleteAddress: async (id: number) => {
        await api.delete(`/user/addresses/${id}`);
    },

    setDefaultAddress: async (id: number) => {
        const response = await api.post<Address>(`/user/addresses/${id}/default`);
        return response.data;
    },
};
