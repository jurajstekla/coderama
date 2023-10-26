import React, { memo, FC, useRef, useLayoutEffect } from 'react';
import { Button, useTheme, SxProps, Box } from '@mui/material';
import gsap from 'gsap-trial';

interface ThemeModeTogglerProps {
  sx: SxProps;
}
const ThemeModeToggler: FC<ThemeModeTogglerProps> = memo(function ThemeModeToggler({ sx }) {
  const theme = useTheme();
  const boxRef = useRef();
  const { mode } = theme.palette;

  return (
    <Button
      aria-label='Dark mode toggler'
      color='buttons'
      sx={{
        minWidth: 'auto',
        padding: 1.25,
        ...sx
      }}
      variant='outlined'
      onClick={theme.themeToggler}
    >
      <Box ref={boxRef}>
        <svg
          fill='none'
          height={24}
          stroke='currentColor'
          viewBox='0 0 24 24'
          width={24}
          xmlns='http://www.w3.org/2000/svg'
        >
          {mode === 'light' ? (
            <path
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          ) : (
            <path
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          )}
        </svg>
      </Box>
    </Button>
  );
});

export default ThemeModeToggler;
