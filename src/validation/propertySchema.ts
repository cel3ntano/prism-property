import { z } from 'zod';

export const propertyDataSchema = z.object({
  address1: z.string().min(1, 'Address line 1 must contain a value'),
  address2: z.string().optional(),
  city: z.string().min(3, 'City must contain at least 3 characters'),
  postcode: z
    .string()
    .min(3, 'Postcode must be at least 3 characters long')
    .max(10, 'Postcode must be no more than 10 characters')
    .regex(/^[A-Za-z0-9\s-]+$/, 'Invalid postcode format'),
  price: z.coerce.number().positive('Price must be greater than zero'),
  description: z
    .string()
    .min(40, 'Description must be at least 40 characters long'),
  bedrooms: z.coerce
    .number()
    .nonnegative('Bedrooms cannot be negative. Please enter 0 or more.'),
  bathrooms: z.coerce
    .number()
    .nonnegative('Bathrooms cannot be negative. Please enter 0 or more.'),
  status: z.enum(['draft', 'for-sale', 'withdrawn', 'sold']),
});

export const propertyImagesSchema = z.object({
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      file: z.instanceof(File).optional(),
    })
  ),
});

export const propertySchema = propertyDataSchema.and(propertyImagesSchema);
