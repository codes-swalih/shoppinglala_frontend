import React from 'react';

// mui
import { Typography, Grid, Box, Stack, Container } from '@mui/material';

// components
import ShopCard from 'src/components/cards/shop';

// api
import * as api from 'src/services';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

export default async function ShopComponent() {
  try {
    const data = await api.getShops();
    
    return (
      <Container maxWidth="xl">
        <Stack
          direction={'column'}
          sx={{
            gap: 3,
            mt: 5
          }}
        >
          <Box>
            <Typography variant="h2" color="text.primary" textAlign="center">
              All Shops
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {data?.data?.map((inner) => (
                <Grid item lg={4} md={6} sm={6} xs={12} key={inner.id || Math.random()}>
                  <ShopCard shop={inner} isLoading={false} />
                </Grid>
              ))}
              {!data?.data?.length && (
                <Typography variant="h3" color="error.main" textAlign="center">
                  Shop not found
                </Typography>
              )}
            </Grid>
          </Box>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.error('Error fetching shops:', error);
    return (
      <Typography variant="h3" color="error.main" textAlign="center">
        Error loading shops. Please try again later.
      </Typography>
    );
  }
}
