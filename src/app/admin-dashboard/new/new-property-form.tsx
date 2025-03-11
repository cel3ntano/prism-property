'use client';
import PropertyForm from '@/components/ui/property-form';
import { propertyDataSchema } from '@/validation/propertySchema';
import { PlusCircle } from 'lucide-react';
import { z } from 'zod';

export default function NewPropertyForm() {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    console.log(data);
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
