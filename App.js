import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Loader = () => (
  <Box width={1} height={1} sx={{ position: 'relative' }}>
    <Box width={1} height={1} sx={{ textAlign: 'center', position: 'absolute' }}>
      <Typography sx={{ fontSize: '20vh', color: 'whitesmoke' }}>DMS</Typography>
    </Box>

    <Box
      width={1}
      sx={{
        position: 'absolute',
        top: '0%',
        transform: 'translateY(50%)',
        textAlign: 'center'
      }}
    >
      <CircularProgress sx={{ width: '10% !important', height: '10% !important' }} />
    </Box>
  </Box>
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  });

  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
