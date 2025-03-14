'use client';

import ContinueWithGoogleButton from '@/components/continue-with-google-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { passwordValidation } from '@/validation/registerUser';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { isFirebaseError } from '@/lib/firebase-errors';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: passwordValidation,
});

export default function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await auth?.loginWithEmail(data.email, data.password);
      router.refresh();
    } catch (e: unknown) {
      toast.error('Error', {
        description:
          isFirebaseError(e) && e.code === 'auth/invalid-credential'
            ? 'Incorrect credentials'
            : 'An error occurred',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Login</Button>
          <div>
            Forgotten your password?
            <Link href="/forgot-password" className="pl-2 underline">
              Reset it here.
            </Link>
          </div>
          <div className="text-center pb-5">or</div>
        </fieldset>
      </form>
      <ContinueWithGoogleButton />
    </Form>
  );
}
