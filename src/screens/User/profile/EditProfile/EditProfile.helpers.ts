import {z} from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .refine(val => !/\d/.test(val), {
      message: 'First name should not contain numbers',
    }),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .refine(val => !/\d/.test(val), {
      message: 'Last name should not contain numbers',
    }),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
});
