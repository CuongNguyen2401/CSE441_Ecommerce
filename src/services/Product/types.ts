export interface CategoryResponse {
  id: number;
  createdDate: string | null;
  modifiedDate: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
  name: string;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE'; 
}

export interface ProductResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  name: string;
  price: number;
  salePrice: number;
  quantity: number;
  image: string;
  slug: string;
  ratings: number;
  category: CategoryResponse;
}
