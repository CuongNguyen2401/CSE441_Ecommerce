export type OrderStatus =
	| 'PENDING'
	| 'PROCESSING'
	| 'SHIPPED'
	| 'DELIVERED'
	| 'CANCELLED';

export type PaymentStatus =
	| 'PENDING'
	| 'COMPLETED'
	| 'FAILED'
	| 'REFUNDED';

export type PaymentMethod =
	| 'CREDIT_CARD'
	| 'PAYPAL'
	| 'BANK_TRANSFER'
	| 'CASH_ON_DELIVERY';
