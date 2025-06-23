import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import PayoutsList from 'src/components/_admin/payouts';

// api
import * as api from 'src/services';

// Meta information
export const metadata = {
  title: 'Payouts - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};
export const dynamic = 'force-dynamic';
export const revalidate = 10;

export default async function PayoutsPage() {
  try {
    const { data: shops } = await api.getAllShopsByAdmin();
    return (
      <div>
        <HeaderBreadcrumbs
          admin
          heading="Payouts"
          links={[
            {
              name: 'Dashboard',
              href: '/admin'
            },
            {
              name: 'Payouts'
            }
          ]}
        />
        <PayoutsList shops={shops} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching shops:', error);
    return (
      <Typography variant="h3" color="error.main" textAlign="center">
        Error loading payouts. Please try again later.
      </Typography>
    );
  }
}
