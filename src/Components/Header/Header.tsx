import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarButton from '../../Global/AvatarButton/AvatarButton';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
import ThemeModeToggler from '../../Global/HelperComponents/ThemeModeToggler';
import { SidebarToggleType } from '../Sidebar/Sidebar';

interface HeaderProps {
  sidebarToggle: SidebarToggleType;
}

const Header: FC<HeaderProps> = ({ sidebarToggle }) => {
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
        {/* <Condition condition={theme.companyLogo !== undefined}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, height: 1 }}>
            <img style={{ height: '100%' }} alt='company logo' src={theme.companyLogo} />
          </Box>
        </Condition> */}
        <AvatarButton sx={{ margin: 'auto 0', ml: 'auto' }} dark={false} onClick={sidebarToggle}>
          <MenuIcon />
        </AvatarButton>
      </Box>
      <ThemeModeToggler
        sx={{
          padding: 1,
          position: 'absolute',
          right: 10,
          top: 10,
          color: 'rgba(0, 0, 0, 0.54)',
          borderColor: 'rgba(0, 0, 0, 0.54)'
        }}
      />
    </>
  );
};

Header.propTypes = {
  sidebarToggle: PropTypes.func
};

export default Header;
