import { PropertyStatus } from '@/types/propertyStatus';
import { Badge } from './badge';

const statusLabel = {
  'for-sale': 'For Sale',
  withdrawn: 'Withdrawn',
  draft: 'Draft',
  sold: 'Sold',
};

const variant: {
  [key: string]: 'primary' | 'destructive' | 'secondary' | 'success';
} = {
  'for-sale': 'primary',
  withdrawn: 'destructive',
  draft: 'secondary',
  sold: 'success',
};

export default function PropertyStatusBadge({
  status,
}: {
  status: PropertyStatus;
}) {
  const label = statusLabel[status];
  return <Badge variant={variant[status]}>{label}</Badge>;
}
