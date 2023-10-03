function lightenDarkenColor(color, percent) {
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
  
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : null;
  }
  export const colors = color => {
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