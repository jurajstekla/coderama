import React, { ReactElement, FC } from 'react';
import { Avatar, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AvatarButtonProps {
  children: ReactElement;
  dark?: Boolean;
  isButton?: Boolean;
  sx: object;
  onClick: ()=>void;
}
const AvatarButton: FC<AvatarButtonProps> = ({ children, dark, isButton, sx, ...props }) => {
  const theme = useTheme();
  const style = {
    background: 'transparent'
  };

  return (
    <Avatar
      sx={{ ...sx, ...style }}
      {...props}
      component={isButton && ButtonBase}
      variant='rounded'
      style={{}}
    >
      {children}
    </Avatar>
  );
};

export default AvatarButton;
