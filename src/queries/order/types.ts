export interface OrderPayload {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
  couponCode: string;
  orderItems: OrderItem[];
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED'
  | 'PAID';

export interface CouponResponse {
  id?: number;
  code?: string;
  discount?: number;
  expiryDate?: string;
  description?: string;
  quantity?: number;
}

export interface OrderItem {
  productName?: string;
  image?: string;
  quantity?: number;
  price?: number;
}

export interface OrderResponse {
  id?: number;
  createdDate?: string;
  modifiedDate?: string;
  createdBy?: string;
  modifiedBy?: string;
  customerName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  totalPay?: number;
  note?: string;
  orderStatus?: string;
  coupon?: CouponResponse;
  orderItems?: OrderItem[];
}
