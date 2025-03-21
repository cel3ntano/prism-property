import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import FiltersForm from './filters-form';
import { getProperties } from '@/data/properties';
import Image from 'next/image';
import { BathIcon, BedIcon, HomeIcon } from 'lucide-react';
import numeral from 'numeral';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import imageUrlFormatter from '@/lib/imageUrlFormatter';
import ToggleFavouriteButton from './toggle-favourite-button';
import { getUserFavourites } from '@/data/favourites';
import { cookies } from 'next/headers';
import { DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '@/firebase/server';
import { PAGE_SIZE } from '@/lib/constants/pageSize';

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsValues = await searchParams;

  const parsedPage = parseInt(String(searchParamsValues?.page || ''));
  const parsedMinPrice = parseInt(String(searchParamsValues?.minPrice || ''));
  const parsedMaxPrice = parseInt(String(searchParamsValues?.maxPrice || ''));
  const parsedMinBedrooms = parseInt(
    String(searchParamsValues?.minBedrooms || '')
  );

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: PAGE_SIZE,
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ['for-sale'],
    },
  });

  const userFavourites = await getUserFavourites();

  const cookieStore = await cookies();
  const token = cookieStore.get('firebaseAuthToken')?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold p-5">Property Search</h1>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>{<FiltersForm />}</Suspense>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 mt-5 gap-5">
        {data.map((property) => {
          const addressLines = [
            property.address1,
            property.address2,
            property.city,
            property.postcode,
          ]
            .filter((addressLine) => !!addressLine)
            .join(', ');
          return (
            <Card key={property.id} className="overflow-hidden p-0">
              <CardContent className="px-0">
                <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center">
                  {(!verifiedToken || !verifiedToken.admin) && (
                    <ToggleFavouriteButton
                      isFavourite={userFavourites[property.id]}
                      propertyId={property.id}
                    />
                  )}
                  {!!property.images?.[0] && (
                    <Image
                      fill
                      className="object-cover"
                      src={imageUrlFormatter(property.images[0])}
                      alt=""
                    />
                  )}
                  {!property.images?.[0] && (
                    <>
                      <HomeIcon />
                      <small>No Image</small>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-5 p-5">
                  <p>{addressLines}</p>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <BedIcon /> {property.bedrooms}
                    </div>
                    <div className="flex gap-2">
                      <BathIcon /> {property.bathrooms}
                    </div>
                  </div>
                  <p className="text-2xl">
                    €{numeral(property.price).format('0,0')}
                  </p>
                  <Button asChild>
                    <Link href={`/property/${property.id}`}>View Property</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-2 items-center justify-center py-10">
        {Array.from({ length: totalPages }).map((_, i) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValues?.minPrice) {
            newSearchParams.set(
              'minPrice',
              searchParamsValues.minPrice.toString()
            );
          }

          if (searchParamsValues?.maxPrice) {
            newSearchParams.set(
              'maxPrice',
              searchParamsValues.maxPrice.toString()
            );
          }

          if (searchParamsValues?.minBedrooms) {
            newSearchParams.set(
              'minBedrooms',
              searchParamsValues.minBedrooms.toString()
            );
          }

          newSearchParams.set('page', `${i + 1}`);

          return (
            <Button
              asChild={page !== i + 1}
              disabled={page === i + 1}
              variant="outline"
              key={i}
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>
                {i + 1}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
