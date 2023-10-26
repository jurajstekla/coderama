import { useCallback, useEffect, useState } from 'react';
import {
  ButtonProps,
  createTheme,
  responsiveFontSizes,
  Theme as ThemeType,
  TypeBackground
} from '@mui/material';
import componentStyleOverrides from './componentStyleOverrides';
import { getDarkTheme, getLightTheme } from './palette';
import logo from '../Img/movie.png';

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    themeToggler: () => void;
    adminSidebarWidth: number;
    sideMenuWidth: number;
    companyLogo: string;
  }

  interface Theme {
    themeToggler: () => void;
    adminSidebarWidth: number;
    sideMenuWidth: number;
    companyLogo: string;
  }
}
declare module '@mui/material' {
  interface Palette {
    buttons: object;
    subtitle: string;
    hover: string;
    themeHover: string;
    avatarColor: { light: string };
    shadow: { primary: string };
    border: string;
    borderColor: string;
    themeBorder: string;
  }

  interface ButtonPropsVariantOverrides {
    empty: true;
  }
  interface ButtonPropsColorOverrides {
    buttons: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    lgDrawer: true;
    mdDrawer: true;
    xsm: true;
  }
}

export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string) => {
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

export const getTheme = (mode: string, themeToggler: () => void): ThemeType => {
  const themeBasic = createTheme({
    adminSidebarWidth: 250,
    breakpoints: {
      values: {
        xs: 0,
        xsm: 400,
        sm: 600,
        mdDrawer: 825, // 800 + 25 (drawer, padding)
        md: 900,
        lgDrawer: 1075, // 800 + 250 + 25 (drawer, admin panel, padding)
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
      body3: {
        fontSize: 17,
        letterSpacing: 1,
        color: themeBasic.palette.primary.main
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
        color: themeBasic.palette.primary.main,
        fontSize: 17,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.3
      },
      h6: {
        color: themeBasic.palette.primary.main,
        fontSize: 16,
        fontWeight: themeBasic.typography.fontWeightBold,
        lineHeight: 1.3
      }
    }
  });

  return responsiveFontSizes(theme);
};
