import { TextField, styled, Button, Box } from '@mui/material';
import { ArrowRight, ArrowDropDown, Settings } from '@mui/icons-material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const StyledTextField = styled(TextField)(() => ({
  '& input': {
    paddingTop: 6
  }
}));

export const StyledAutocompleteTextField = styled(TextField)(() => ({
  height: 'auto',
  '& .MuiInputBase-root': {
    height: 'auto'
  }
}));

export const StyledArrowRight = styled(ArrowRight)(() => ({
  transition: 'transform .3s ease-in-out',
  '&:hover': {
    transform: 'rotate(90deg)'
  }
}));

export const StyledArrowDown = styled(ArrowDropDown)(() => ({
  transition: 'transform .3s ease-in-out',
  '&:hover': {
    transform: 'rotate(-90deg)'
  }
}));

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid lightgray',
    boxShadow: theme.palette.shadow.secondary,
    fontSize: 15
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.background.paper,
    '&:before': {
      border: '1px solid lightgray'
    }
  }
}));

export const StyledTd = styled('td')(() => ({
  textAlign: 'center'
}));

export const StyledSettings = styled(Settings)(() => ({
  marginRight: '5px',
  '&:hover': {
    transition: 'transform .5s ease-in',
    transform: 'rotate(180deg)'
  }
}));

export const dropzoneBoxStyle = (getColors, theme) => {
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '3px',
    borderRadius: '2px',
    borderColor: getColors(),
    borderStyle: 'dashed',
    backgroundColor: theme.palette.background.paperLight,
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
};

export const StyledTableActionButon = styled(Button, { shouldForwardProp: prop => prop })(
  ({ theme }) => ({
    minWidth: 30,
    background: theme.palette.background.paper,
    color: theme.palette.secondary.main,
    padding: '6px 10px',
    margin: '1px',
    height: '30px',
    zIndex: 10,
    '&:hover': {
      zIndex: 11,
      color: 'white'
    }
  })
);

export const StyledFlagBox = styled(Box, { shouldForwardProp: prop => prop !== 'active' })(
  ({ active, theme }) => ({
    padding: 8,
    boxShadow: active && theme.palette.shadow.primary,
    borderRadius: 5,
    '&:hover': {
      boxShadow: theme.palette.shadow.primary
    }
  })
);
