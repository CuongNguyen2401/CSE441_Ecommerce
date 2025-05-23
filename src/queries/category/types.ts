export type CategoryStatus = 'ACTIVE' | 'INACTIVE'; // Assuming possible status values

export interface CategoryResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  name: string;
  description: string;
  status: CategoryStatus;
}

export interface CategoryRequest {
  name: string;
  description: string;
  status: CategoryStatus;
}

export interface CategoryUpdateRequest extends CategoryRequest {
  id: number;
}
