import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ open, theme, sx }) => ({
    ...sx,
    ...(!open && {
      borderBottomLeftRadius: 0,
      overflow: 'hidden',
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      [theme.breakpoints.up('md')]: {
        // marginLeft: -sidebarWidth,
        width: '100%',
        padding: '8px 16px'
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '8px'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '4px'
      }
    }),
    ...(open && {
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: '8px 16px',
      width: '100%',

      [theme.breakpoints.down('md')]: {
        padding: '8px',
        width: '100%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '4px'
      }
    })
  })
);

Main.propTypes = {
  open: PropTypes.bool,
  theme: PropTypes.object.isRequired
};

export default Main;
