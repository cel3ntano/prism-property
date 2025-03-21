'use server';

import { auth, firestore } from '@/firebase/server';
import { Property } from '@/types/property';
import { propertyDataSchema } from '@/validation/propertySchema';

type SavePropertyInput = Omit<Property, 'id'>;

export const createProperty = async (
  propertyData: SavePropertyInput,
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

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
