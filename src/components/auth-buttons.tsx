'use client';

import Link from 'next/link';
import { useAuth } from '../../context/auth';

export default function AuthButtons() {
  const auth = useAuth();

  const authLinkStyles = 'uppercase tracking-widest hover:underline';

  return (
    <div>
      {!!auth?.currentUser && (
        <>
          <div>{auth.currentUser.email}</div>
          <div onClick={() => auth.logout()}>Logout</div>
        </>
      )}
      {!auth?.currentUser && (
        <div className="flex gap-2 items-center">
          <Link href="login" className={authLinkStyles}>
            Login
          </Link>
          <div className="h-6 w-[1px] bg-white/50"></div>
          <Link href="register" className={authLinkStyles}>
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
