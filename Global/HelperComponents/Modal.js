import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';

const Modal = ({
  open,
  handleClose,
  title,
  description,
  size,
  buttonTitle,
  buttonProps,
  children,
  customFooter,
  header,
  contetnOverflow,
  heightSize,
  disableSubmitOnEnter,
  ...props
}) => {
  const { t } = useTranslation();

  const onCloseHandler = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleClose();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={size}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          handleClose();
          e.preventDefault();
        } else if (!disableSubmitOnEnter && e.key === 'Enter' && !buttonProps.disabled) {
          if (buttonProps.onClick) {
            buttonProps?.onClick();
          }
          e.preventDefault();
        }
      }}
      open={open}
      onClose={onCloseHandler}
      aria-labelledby={title}
      disableEscapeKeyDown={true}
      aria-describedby={description}
      {...props}
      sx={{ zIndex: 1200 }}
      PaperProps={{
        sx: {
          ...(size === 'xl' && {
            maxWidth: '100%'
          }),
          height: heightSize === 'max' ? 'calc(100% - 64px)' : 'auto'
        }
      }}
    >
      <DialogTitle sx={{ p: 1, display: 'flex' }}>
        <Typography variant='body3'>{title}</Typography>
        <Box sx={{ ml: 'auto' }}> {header}</Box>
      </DialogTitle>
      <DialogContent dividers style={{ padding: '8px 16px', height: '100%' }} sx={contetnOverflow}>
        {children}
      </DialogContent>

      <DialogActions>
        <Box sx={{ mr: 'auto' }}>{customFooter}</Box>
        {buttonTitle && (
          <Button
            sx={{ mr: '10px' }}
            variant='contained'
            onClick={buttonProps?.onClick}
            {...buttonProps}
          >
            {t(buttonTitle)}
          </Button>
        )}

        <Button endIcon={<Close />} color='secondary' variant='outlined' onClick={onCloseHandler}>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  title: PropTypes.string,
  heightSize: PropTypes.oneOf(['auto', 'max']),
  open: PropTypes.bool,
  buttonProps: PropTypes.any,
  handleClose: PropTypes.func,
  description: PropTypes.string,
  buttonTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  customFooter: PropTypes.node,
  header: PropTypes.node,
  contetnOverflow: PropTypes.object,
  disableSubmitOnEnter: PropTypes.bool
};
Modal.defaultProps = {
  size: 'sm',
  heightSize: 'auto',
  contetnOverflow: { overflowY: 'auto' },
  disableSubmitOnEnter: false
};
export default Modal;
