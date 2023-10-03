import React from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Condition from './Condition';
import { loaderSizes } from '../constants';

const DisableableBox = ({ children, loading, sx, loaderSize, linear, withoutBlur }) => {
  return (
    <Box
      sx={sx}
      style={{
        pointerEvents: loading && 'none',
        position: 'relative'
      }}
      width={1}
      height={1}
    >
      <Box width={1} height={1} sx={{ position: 'absolute' }}>
        {children}
      </Box>
      <Condition condition={loading}>
        <Box
          width={1}
          height={1}
          sx={{
            zIndex: '10',
            borderRadius: 2,
            background: !withoutBlur && 'rgb(0 0 0 / 10%)'
          }}
        >
          <Condition condition={linear}>
            <Box
              width={1}
              height={1}
              sx={{
                display: 'flex',
                alignItems: 'end'
              }}
            >
              <LinearProgress sx={{ width: '100%' }} color='buttons' />
            </Box>
            <Box
              width={1}
              height={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress color='buttons' size={loaderSizes[loaderSize]} />
            </Box>
          </Condition>
        </Box>
      </Condition>
    </Box>
  );
};

DisableableBox.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  loaderSize: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
  linear: PropTypes.bool,
  withoutBlur: PropTypes.bool
};
DisableableBox.defaultProps = {
  loaderSize: 'medium',
  linear: false,
  withoutBlur: false
};

export default React.memo(DisableableBox);
