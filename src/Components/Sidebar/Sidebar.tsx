import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import { sidebarWidth, headerHeight } from '../../Global/constants';
import SidebarMenu from './SidebarMenu/SidebarMenu';
// project imports
// ==============================|| SIDEBAR DRAWER ||============================== //

export type SidebarToggleType = () => void;

interface SidebarProps {
  sidebarToggle: SidebarToggleType;
  sidebarOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, sidebarToggle }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box
        sx={{
          background: theme.palette.primary.main,
          height: headerHeight,
          display: { xs: 'flex', md: 'none' }
        }}
      >
        <img
          style={{ height: '100%', margin: 'auto' }}
          alt='company logo'
          // src={theme.companyLogo}
        />
      </Box>
      <BrowserView>
        <Box
          component='div'
          sx={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            p: 2,
            pt: 1
          }}
        >
          <SidebarMenu sidebarToggle={sidebarToggle} />
        </Box>
      </BrowserView>
      <MobileView>
        <Box sx={{ p: 2 }}>
          <SidebarMenu sidebarToggle={sidebarToggle} />
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component='nav' sx={{ flexShrink: { md: 0 }, width: 'auto' }} aria-label='mailbox folders'>
      <Drawer
        container={container}
        variant={'temporary'}
        anchor='left'
        open={sidebarOpen}
        onClose={sidebarToggle}
        sx={{
          '& .MuiDrawer-paper': {
            overflow: 'hidden',
            width: sidebarWidth,
            background: theme.palette.background.default,
            [theme.breakpoints.up('md')]: {
              top: headerHeight
              // boxShadow: theme.palette.shadow.primary
            },
            border: 'none'
          }
        }}
        ModalProps={{ keepMounted: true }}
        color='inherit'
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
