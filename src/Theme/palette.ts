import { PaletteMode, PaletteOptions } from '@mui/material';

type CustomThemeOprions = {
  background: { paperLight: string };
  primary: { main2: string };
  buttons: object;
  subtitle: string;
  hover: string;
  themeHover: string;
  avatarColor: object;
  shadow: object;
  border: string;
  borderColor: string;
  themeBorder: string;
};

export const getLightTheme = (color: string): PaletteOptions & CustomThemeOprions => {
  const themeColors = mixColors(color);

  return {
    mode: 'light' as PaletteMode,
    background: {
      paper: '#F3F3F3',
      default: '#F3F3F3',
      paperLight: '#F3F3F3'
    },
    buttons: {
      main: themeColors.PRIMARY
    },
    primary: {
      main: themeColors.PRIMARY,
      main2: themeColors.PRIMARY,
      light: themeColors.LIGHTPRIMARY,
      dark: themeColors.DARKPRIMARY
    },
    secondary: {
      main: themeColors.PRIMARY
    },
    subtitle: themeColors.GRAY,
    hover: themeColors.HOVER,
    themeHover: themeColors.LIGHTPRIMARY,
    avatarColor: {
      light: themeColors.WHITE,
      dark: themeColors.GRAY
    },
    shadow: {
      primary: '0px 2px 15px rgb(0 0 0 / 0.3)',
      secondary: '0px 2px 5px rgb(0 0 0 / 0.3)'
    },
    border: '1px solid rgba(209, 209, 209, 0.5)',
    themeBorder: `1px solid ${themeColors.PRIMARY}`,
    borderColor: 'rgba(209, 209, 209, 0.5)'
  };
};

export const getDarkTheme = (color: string): PaletteOptions & CustomThemeOprions => {
  const themeColors = mixColors(color);
  return {
    mode: 'dark' as PaletteMode,
    background: {
      paper: themeColors.DARKPAPER,
      default: themeColors.DARKDARKPAPER,
      paperLight: themeColors.DARKLIGHTPAPER
    },
    buttons: {
      main: themeColors.YELLOW
    },
    primary: {
      main: themeColors.PRIMARY,
      main2: themeColors.WHITE,
      light: themeColors.LIGHTPRIMARY,
      dark: themeColors.DARKPRIMARY
    },
    secondary: {
      main: themeColors.SECONDARY
    },
    subtitle: themeColors.GRAY,
    hover: themeColors.HOVER,
    themeHover: themeColors.LIGHTPRIMARY,
    avatarColor: {
      light: themeColors.WHITE,
      dark: themeColors.GRAY
    },
    shadow: {
      primary: '0px 2px 10px rgb(0 0 0 / 0.3)',
      secondary: '0px 2px 5px rgb(0 0 0 / 0.3)'
    },
    border: '1px solid rgba(160, 160, 160, 0.5)',
    borderColor: 'rgba(160, 160, 160, 0.5)',
    themeBorder: `1px solid ${themeColors.PRIMARY}`
  };
};

function lightenDarkenColor(color: string, percent: number) {
  var num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}
const mixColors = (color: string) => {
  return {
    PRIMARY: color,
    LIGHTPRIMARY: `rgba(${hexToRgb(color)}, 0.3)`,
    DARKPRIMARY: lightenDarkenColor(color, -22),
    DARKPRIMARYlight: lightenDarkenColor(color, -12),
    SECONDARY: '#d1d1d1',
    ERROR: '#f06e6e',
    BLACK: '#000000',
    DARKPAPER: '#4C4C4C',
    DARKDARKPAPER: '#333333',
    DARKLIGHTPAPER: '#666666',
    LIGHTGRAY: '#d3d3d3',
    GRAY: '#949494',
    WHITE: '#ffffff',
    YELLOW: '#bfa110',
    HOVER: 'rgb(193 193 193 / 20%)'
  };
};
