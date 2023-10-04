import React from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackLoader = () => (
  <Box width={1} height={1} sx={{ position: 'relative' }}>
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

export default FallbackLoader;
