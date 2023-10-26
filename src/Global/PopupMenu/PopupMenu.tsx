import React, { FC, ReactNode, RefObject, useRef } from 'react';
import { usePopupMenu } from './PopupMenuHelpers';
import { SxProps, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  PopperPlacementType,
  useMediaQuery
} from '@mui/material';
import Transitions from '../HelperComponents/Transitions';

interface PopupMenuProps {
  children: ReactNode;
  icon: ReactNode;
  chip: any;
  sx: SxProps;
  placement: PopperPlacementType;
  offset: object;
  dark: boolean;
}

const PopupMenu: FC<PopupMenuProps> = ({ children, icon, chip, dark, sx, placement, offset }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef: RefObject<HTMLElement | null> = useRef(null);
  const [open, handleOpen, handleClose] = usePopupMenu(anchorRef);

  return (
    <>
      <Box sx={{ ...sx, position: 'relative' }}>
        <ButtonBase>
          <Avatar
            sx={{
              background: 'transparent',
              color: dark ? theme.palette.primary.main : theme.palette.avatarColor.light,
              transition: 'all .2s ease-in-out',
              '&[aria-controls="menu-list-grow"], &:hover': {
                color: theme.palette.avatarColor.light,
                background: theme.palette.hover
              },
              width: 35,
              height: 35
            }}
            // ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            variant='rounded'
            onClick={handleOpen}
          >
            {icon}
          </Avatar>
        </ButtonBase>

        {chip && chip}
      </Box>
      <Popper
        placement={placement ? placement : matchesXs ? 'bottom' : 'bottom-end'}
        open={open as boolean}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: offset ? offset : [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? 'top' : 'top-right'}
            in={open ? true : false}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow:
                  '0px 3px 10px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box minWidth={200} sx={{ p: 1 }}>
                  {children}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default PopupMenu;
