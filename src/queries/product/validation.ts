import {z} from 'zod';

export const productFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Product name is required')
      .min(3, 'Product name must be at least 3 characters'),
    description: z.string().optional(),
    price: z.number().min(0.01, 'Price must be greater than 0'),
    salePrice: z.number().optional(),
    quantity: z.number().min(0, 'Quantity must be 0 or greater'),
    categoryId: z.number().min(1, 'Please select a category'),
    productStatus: z.enum(['ACTIVE', 'INACTIVE']),
    relatedProducts: z.array(z.string()),
  })
  .refine(
    data => {
      if (data.salePrice !== undefined && data.salePrice >= data.price) {
        return false;
      }
      return true;
    },
    {
      message: 'Sale price must be less than regular price',
      path: ['salePrice'],
    },
  );

export type ProductFormData = z.infer<typeof productFormSchema>;
