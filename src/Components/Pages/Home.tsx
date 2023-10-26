import React from 'react';
import { useSidebarToggler } from './homeHelpers';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../Sidebar/Sidebar';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { headerHeight } from '../../Global/constants';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const [isSidebarOpen, sidebarToggle] = useSidebarToggler();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'fixed',
        minHeight: '-webkit-fill-available',
        overflow: 'hidden'
      }}
    >
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position='fixed'
        color='inherit'
        elevation={0}
        sx={{
          height: headerHeight,
          background: theme.palette.primary.main
        }}
      >
        <Toolbar sx={{ height: 1, padding: 1, paddingBottom: '10px' }}>
          <Header sidebarToggle={sidebarToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar sidebarOpen={isSidebarOpen} sidebarToggle={sidebarToggle} />
      <Main sx={{ marginTop: `${headerHeight}px` }} theme={theme}>
        <Outlet />
      </Main>
      {/* main content */}
    </Box>
  );
};

export default Home;
