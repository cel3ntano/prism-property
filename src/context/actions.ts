'use server';

import { cookies } from 'next/headers';
import { auth } from '@/firebase/server';

const cookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('firebaseAuthToken');
  cookieStore.delete('firebaseRefreshToken');
};

export const setToken = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return;
    }
    const userRecord = await auth.getUser(verifiedToken.uid);
    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      auth.setCustomUserClaims(verifiedToken.uid, { admin: true });
    }

    const cookieStore = await cookies();
    cookieStore.set('firebaseAuthToken', token, cookieSettings);
    cookieStore.set('firebaseRefreshToken', refreshToken, cookieSettings);
  } catch (error) {
    console.error(error);
  }
};
