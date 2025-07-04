import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddSubCategory from 'src/components/_admin/subCategories/addCategory';

// api
import * as api from 'src/services';

// Add these lines at the top after imports
export const dynamic = 'force-dynamic';
export const revalidate = 10;

// Also fix the getAllCategories call to use admin version
export default async function page() {
  const data = await api.getAllCategoriesByAdmin(); // Changed from getAllCategories to getAllCategoriesByAdmin
  if (!data) {
    notFound();
  }
  const { data: categories } = data;
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Sub Categories List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Sub Categories',
            href: '/admin/sub-categories'
          },
          {
            name: 'Add Sub Category'
          }
        ]}
      />
      <AddSubCategory categories={categories} />
    </div>
  );
}
