import React, { useRef } from 'react';
import { usePopupMenu } from './PopupMenuHelpers';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  useMediaQuery
} from '@mui/material';
import Transitions from '../../Global/HelperComponents/Transitions';

const PopupMenu = ({ children, icon, chip, dark, sx, placement, offset }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef();
  const [open, handleOpen, handleClose] = usePopupMenu(anchorRef);

  const style = { ...{ position: 'relative' }, ...sx };
  return (
    <>
      <Box sx={style}>
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
            ref={anchorRef}
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
        open={open}
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

PopupMenu.propTypes = {
  children: PropTypes.node,
  dark: PropTypes.bool,
  chip: PropTypes.node,
  sx: PropTypes.object,
  icon: PropTypes.node
};
export default PopupMenu;
