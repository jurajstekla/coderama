import React, { FC, ReactNode, memo } from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress, SxProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Condition from './Condition';
import { loaderSizes } from '../constants';

interface DisableableBoxProps {
  children: ReactNode;
  loading: Boolean;
  loaderSize?: 'small' | 'medium' | 'large';
  sx?:SxProps;
  linear?:Boolean;
  withoutBlur?: Boolean;

}
const DisableableBox:FC<DisableableBoxProps> = memo(({ children, loading, sx, loaderSize, linear, withoutBlur }) => {
  const sxx = {...sx,
    pointerEvents: loading && 'none',
    position: 'relative'
  }
  
  return (
    <Box
      sx={sxx as SxProps} 
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
              <LinearProgress sx={{ width: '100%' }} color='inherit' />
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
              <CircularProgress color='warning' size={loaderSizes[loaderSize]} />
            </Box>
          </Condition>
        </Box>
      </Condition>
    </Box>
  );
});

DisableableBox.defaultProps = {
  loaderSize: 'medium',
  linear: false,
  withoutBlur: false
};



export default DisableableBox;
