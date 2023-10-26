import React, { FC, MouseEventHandler, ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  SxProps,
  DialogProps
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  buttonTitle: string;
  buttonProps: { onClick: () => void; disabled: boolean };
  children: ReactNode;
  customFooter: ReactNode;
  header: ReactNode;
  contetnOverflow: SxProps;
  disableSubmitOnEnter: boolean;
  heightSize: 'auto' | 'max';
}

const Modal: FC<ModalProps> = ({
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

  const onCloseHandler: DialogProps['onClose'] = (event, reason) => {
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
        <Typography variant='body2'>{title}</Typography>
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
            // onClick={onClick}
            {...buttonProps}
          >
            {t(buttonTitle)}
          </Button>
        )}

        <Button
          endIcon={<Close />}
          color='buttons'
          variant='outlined'
          onClick={e => onCloseHandler(e, 'escapeKeyDown')}
        >
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.defaultProps = {
  size: 'sm',
  heightSize: 'auto',
  contetnOverflow: { overflowY: 'auto' },
  disableSubmitOnEnter: false
};
export default Modal;
