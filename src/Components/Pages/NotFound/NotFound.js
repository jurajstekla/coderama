import React from 'react';
import not_found from '../../../Img/404.png';
import PageFormWrapper from '../../../Global/HelperComponents/PageFormWrapper';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const NotFound = ({ navigate }) => {
  return (
    <PageFormWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box>
          <img style={{ width: '100%' }} alt='not found logo' src={not_found} />
        </Box>
        <Typography variant='h5'>Page not found ...</Typography>
        <Button onClick={() => navigate('/')} variant='contained'>
          Back
        </Button>
      </Box>
    </PageFormWrapper>
  );
};

NotFound.propTypes = {
  navigate: PropTypes.func
};
export default NotFound;
