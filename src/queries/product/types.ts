import {CategoryResponse} from 'services/Product/types';

export type ProductUpdateRequest = {
  [key: string]: any;
  image?: File;
};

export type ProductStatus = 'ACTIVE' | 'INACTIVE'; // Assuming possible status values

export interface ProductResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  quantity: number;
  image: string;
  slug: string;
  ratings: number;
  productStatus: ProductStatus;
  category: CategoryResponse;
  relatedProducts: string[];
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  quantity: number;
  categoryId: number;
  productStatus: ProductStatus;
  relatedProducts?: string[];
  image?: File;
}
