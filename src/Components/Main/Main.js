import { styled } from '@mui/material/styles';

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, sx }) => ({
  ...sx,

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
}));

export default Main;
