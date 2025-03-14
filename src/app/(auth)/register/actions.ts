'use server';

import { auth } from '@/firebase/server';
import { registerUserSchema } from '@/validation/registerUser';
import {
  isFirebaseError,
  getFirebaseErrorMessage,
} from '@/lib/firebase-errors';

export const registerUser = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}) => {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? 'An error occurred',
    };
  }

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (e: unknown) {
    return {
      error: true,
      message: isFirebaseError(e)
        ? getFirebaseErrorMessage(e.code)
        : e instanceof Error
        ? e.message
        : 'Could not register user',
    };
  }
};
