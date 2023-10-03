import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AvatarButton = ({ children, dark, isButton, sx, ...props }) => {
  const theme = useTheme();
  const style = {
    '&:hover': {
      background: isButton && theme.palette.hover
    },
    background: 'transparent',
    color: theme.palette.avatarColor[dark ? 'dark' : 'light']
  };

  return (
    <Avatar
      sx={{ ...sx, ...style }}
      {...props}
      component={isButton ? ButtonBase : ''}
      variant='rounded'
      style={{}}
    >
      {children}
    </Avatar>
  );
};

AvatarButton.propTypes = {
  children: PropTypes.node,
  dark: PropTypes.bool,
  isButton: PropTypes.bool,
  sx: PropTypes.object
};
AvatarButton.defaultProps = {
  isButton: true,
  dark: false
};
export default AvatarButton;
