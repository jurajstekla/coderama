import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMenu } from './sidebarMenuHelpers';
import { privatePages } from '../../../Global/constants';

const SidebarMenu = ({ sidebarToggle }) => {
  const [location, switchLocation] = useMenu(sidebarToggle);

  return (
    <List sx={{ pt: 1 / 2 }}>
      {privatePages[0].children.slice(0, privatePages[0].children.length - 2).map(child => (
        <ListItemButton
          key={child.path}
          onClick={() => switchLocation(child.path)}
          selected={location === child.path}
          sx={{ height: '43px' }}
        >
          <ListItemIcon>{React.createElement(child.menuIcon)}</ListItemIcon>
          <ListItemText primary={<Typography variant='body1'>{child.menuLabel}</Typography>} />
        </ListItemButton>
      ))}
    </List>
  );
};

SidebarMenu.propTypes = {
  sidebarToggle: PropTypes.func
};

export default SidebarMenu;
