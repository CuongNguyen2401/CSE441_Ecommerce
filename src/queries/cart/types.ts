export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
  color?: string;
  inStock: boolean;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  promoCode?: string;
  promoDiscount: number;
  total: number;
}

export interface CouponResponse {
  id: number;
  code: string;
  discount: number;
  expiryDate: string;
  quantity: number;
  description?: string;
  isGlobal: boolean;
  createdDate: string;
  modifiedDate: string;
}

export interface OrderRequest {
  userId?: number;
  orderItems: OrderItemRequest[];
  couponCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  cardDetails?: CardDetails;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}
