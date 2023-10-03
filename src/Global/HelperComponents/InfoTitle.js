import React from 'react';
import PropTypes from 'prop-types';
import { InfoOutlined } from '@mui/icons-material';
import { StyledTooltip } from '../StyledComponents/styledComponents';
import { Box } from '@mui/material';

const InfoTitle = ({ message, sx }) => {
  return (
    <Box sx={{ ...sx, display: 'flex', alignItems: 'center' }}>
      <StyledTooltip title={message} arrow>
        <InfoOutlined color='disabled' sx={{ cursor: 'pointer', fontSize: 22 }} />
      </StyledTooltip>
    </Box>
  );
};

InfoTitle.propTypes = {
  message: PropTypes.any,
  sx: PropTypes.object
};

export default InfoTitle;
