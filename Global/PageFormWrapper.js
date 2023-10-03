import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, CssBaseline } from '@mui/material';
import ThemeModeToggler from './ThemeModeToggler';
import { useTheme } from '@mui/material/styles';
import Condition from './HelperComponents/Condition';

const PageFormWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5
      }}
    >
      <ThemeModeToggler sx={{ padding: 1, position: 'absolute', right: 10, top: 10 }} />

      <CssBaseline />
      <Box
        sx={{
          width: 1 / 3,
          height: 90,
          marginBottom: '-35px',
          zIndex: '111',
          background: theme.palette.primary.main,
          borderRadius: 2,
          p: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Condition condition={theme.companyLogo !== undefined}>
          <Box>
            <img style={{ width: '100%' }} alt='company logo' src={theme.companyLogo} />
          </Box>
        </Condition>
      </Box>
      <Box
        sx={{
          width: 1,
          boxShadow: theme.palette.shadow.primary,
          padding: 4,
          borderRadius: 2,
          background: theme.palette.background.paperLight,
          mt: 1
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

PageFormWrapper.propTypes = {
  children: PropTypes.node
};

export default PageFormWrapper;
