'use server';

import { auth, firestore } from '@/firebase/server';
import { propertyDataSchema } from '@/validation/propertySchema';

export const saveNewProperty = async (data: {
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: 'draft' | 'for-sale' | 'widthdrawn' | 'sold';
  token: string;
}) => {
  const { token, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }
  const validation = propertyDataSchema.safeParse(propertyData);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? 'Something went wrong',
    };
  }

  const property = await firestore.collection('properties').add({
    ...propertyData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    propertyId: property.id,
  };
};
