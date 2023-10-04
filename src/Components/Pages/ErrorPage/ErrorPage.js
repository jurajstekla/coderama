import React from 'react';
import PropTypes from 'prop-types';
import error_logo from '../../../Img/500.png';
import PageFormWrapper from '../../../Global/HelperComponents/PageFormWrapper';
import { Button, Box, Typography } from '@mui/material';

const ErrorPage = ({ navigate }) => {
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
          <img style={{ width: '100%' }} alt='error logo' src={error_logo} />
        </Box>
        <Typography variant='h5'>daco zle</Typography>
        <Button sx={{ mt: 2 }} variant='outlined' onClick={() => navigate(`/login`)}>
          {t('logout')}
        </Button>
      </Box>
    </PageFormWrapper>
  );
};

ErrorPage.propTypes = { navigate: PropTypes.func };

export default ErrorPage;
