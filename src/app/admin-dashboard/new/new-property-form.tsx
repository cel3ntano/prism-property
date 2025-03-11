'use client';
import PropertyForm from '@/components/ui/property-form';
import { useAuth } from '@/context/auth';
import { propertyDataSchema } from '@/validation/propertySchema';
import { PlusCircle } from 'lucide-react';
import { z } from 'zod';
import { saveNewProperty } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await saveNewProperty({ ...data, token });
    if (response.error) {
      toast.error('Error', {
        description: response.message,
      });
      return;
    }

    toast.success('Success', {
      description: 'Property created',
    });

    router.push('/admin-dashboard');
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircle /> Create property
          </>
        }
      ></PropertyForm>
    </div>
  );
}
