'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/client';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { FormEvent } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Error', {
        description: 'Please enter your email address',
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setEmail('');
      toast.success('Success', {
        description: 'Password reset link has been sent',
      });
    } catch (e: unknown) {
      console.error(e);
      toast.error('Error', {
        description: 'An error occurred',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
      />
      <Button className="w-full" type="submit">
        Reset Password
      </Button>
    </form>
  );
}
