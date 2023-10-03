import { useCallback, useEffect, useState } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material';
import componentStyleOverrides from './componentStyleOverrides';
import { getDarkTheme, getLightTheme } from './palette';
import logo from '../Img/movie.png';
// add additional properties to theme

export const useDarkMode = () => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = mode => {
    window.localStorage.setItem('themeMode', mode);
    setTheme(mode);
  };

  const themeToggler = useCallback(() => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
  }, [themeMode]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeMode');
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

export const getTheme = (mode, themeToggler) => {
  const themeBasic = createTheme({
    adminSidebarWidth: 250,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
      }
    },
    companyLogo: logo,
    palette: mode === 'light' ? getLightTheme('#db9e34') : getDarkTheme('#db9e34'),
    sideMenuWidth: 180,
    themeToggler:
      themeToggler ||
      (() => {
        console.error('Theme toggler has not been provided');
      }),
    typography: {
      fontFamily: ['PxGrotesk', 'Arial', 'sans-serif'].join(',')
    }
  });

  const theme = createTheme(themeBasic, {
    components: componentStyleOverrides(themeBasic),
    shape: {
      borderRadius: 5
    },

    typography: {
      body1: {
        color: themeBasic.palette.text.primary,
        fontSize: 15,
        fontWeight: themeBasic.typography.fontWeightRegular,
        lineHeight: 1.5,
        textTransform: 'none'
      },
      body2: {
        color: themeBasic.palette.text.primary,
        fontSize: 13,
        fontWeight: themeBasic.typography.fontWeightRegular,
        lineHeight: 1.5
      },
      button: {
        fontSize: 14,
        letterSpacing: 1
      },
      subtitle1: {
        fontSize: 15,
        letterSpacing: 1,
        color: themeBasic.palette.subtitle
      },
      subtitle2: {
        fontSize: 17,
        letterSpacing: 1,
        color: themeBasic.palette.subtitle
      },
      body3: {
        fontSize: 17,
        letterSpacing: 1,
        color: themeBasic.palette.primary.main2
      },
      h1: {
        color: themeBasic.palette.primary.main,
        fontSize: 70,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.3
      },
      h2: {
        color: themeBasic.palette.primary.main,
        fontSize: 50,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.1
      },
      h3: {
        color: themeBasic.palette.primary.main,
        fontSize: 42,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.1
      },
      h4: {
        color: themeBasic.palette.primary.main,
        fontSize: 32,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.2
      },
      h5: {
        color: themeBasic.palette.primary.main2,
        fontSize: 17,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.3
      },
      h6: {
        color: themeBasic.palette.primary.main2,
        fontSize: 16,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.3
      }
    }
  });

  return responsiveFontSizes(theme);
};
