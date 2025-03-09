'use client';

import Link from 'next/link';
import { useAuth } from '../../context/auth';

export default function AuthButtons() {
  const auth = useAuth();

  return (
    <div>
      {!!auth?.currentUser && (
        <>
          <div>{auth.currentUser.email}</div>
          <div onClick={() => auth.logout()}>Logout</div>
        </>
      )}
      {!auth?.currentUser && (
        <>
          <Link href="login">Login</Link>
          <Link href="register">Signup</Link>
        </>
      )}
    </div>
  );
}
