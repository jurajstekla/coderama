import React from 'react';
import PropTypes from 'prop-types';
import {  useTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarButton from '../../Global/AvatarButton/AvatarButton';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
import Condition from '../../Global/HelperComponents/Condition';
import ThemeModeToggler from '../../Global/ThemeModeToggler';

const Header = ({ sidebarToggle }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        title='Menu'
        sx={{
          width: 175,
          display: 'flex',
          height: 1,
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Condition condition={theme.companyLogo !== undefined}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, height: 1 }}>
            <img style={{ height: '100%' }} alt='company logo' src={theme.companyLogo} />
          </Box>
        </Condition>
        <AvatarButton sx={{ margin: 'auto 0', ml: 'auto' }} dark={false} onClick={sidebarToggle}>
          <MenuIcon />
        </AvatarButton>
      </Box>
      <ThemeModeToggler sx={{ padding: 1, position: 'absolute', right: 10, top: 10, color:'gray',borderColor:'gray' }} />

    </>
  );
};

Header.propTypes = {
  sidebarToggle: PropTypes.func
};

export default Header;
