import React, { FC } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { StyledTooltip } from '../StyledComponents/styledComponents';
import { Box, SxProps } from '@mui/material';

interface InfoTitleProps {
  message: string;
  sx: SxProps;
}
const InfoTitle: FC<InfoTitleProps> = ({ message, sx }) => {
  return (
    <Box sx={{ ...sx, display: 'flex', alignItems: 'center' }}>
      <StyledTooltip title={message} arrow>
        <InfoOutlined color='disabled' sx={{ cursor: 'pointer', fontSize: 22 }} />
      </StyledTooltip>
    </Box>
  );
};

export default InfoTitle;
