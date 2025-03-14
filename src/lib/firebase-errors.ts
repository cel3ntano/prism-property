/**
 * Type guard for Firebase errors
 * @param error - The unknown error to check
 * @returns TypeScript type predicate indicating if the error is a Firebase error
 */
export function isFirebaseError(
  error: unknown
): error is { code: string; message?: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

/**
 * Converts Firebase error codes to user-friendly messages
 * @param code - The Firebase error code
 * @returns A user-friendly error message
 */
export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-exists':
      return 'This email is already registered';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/invalid-credential':
      return 'Incorrect credentials';
    default:
      return 'An error occurred';
  }
}
