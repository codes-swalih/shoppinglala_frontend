// mui
import { Box, Container } from '@mui/material';

// components
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

// Change from error to force-dynamic to prevent build-time generation
export const dynamic = 'force-dynamic';
export const revalidate = 10;

// Remove generateStaticParams since we're using dynamic rendering
// export async function generateStaticParams() {
//   const { data } = await api.getCompaignSlugs();
//   const mapped = data?.map((compaign) => {
//     return {
//       slug: compaign.slug
//     };
//   });
//   return mapped;
// }

export async function generateMetadata({ params }) {
  const { data: response } = await api.getCompaignBySlug(params.slug);

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    title: response.title,
    openGraph: {
      images: [response.cover.url]
    }
  };
}
export default async function Listing({ params }) {
  const { slug } = params;
  const { data: compaign } = await api.getCompaignTitle(slug);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box mt={3}>
            <ShopDetailCover page={'compaigns'} isUser data={compaign} isLoading={false} />
          </Box>

          <ProductList compaign={compaign} fetchFilters={'getFiltersByShop'} />
        </Container>
      </Box>
    </Box>
  );
}
