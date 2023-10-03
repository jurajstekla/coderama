import React, { useMemo } from 'react';
import RoutesWrapper from './RoutesWrapper';
import { privatePages } from '../Global/constants';
import { ThemeProvider } from '@mui/material';
import { getTheme, useDarkMode } from '../Theme/index';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotify } from '../Global/globalHooks';

const Router = () => {
  const [themeMode, themeToggler] = useDarkMode();

  const theme = useMemo(
    () => getTheme(themeMode, themeToggler),
    [themeMode, themeToggler]
  );
  const navigate = useNavigate();
  useNotify();

  return (
    <ThemeProvider theme={theme}>
      <RoutesWrapper navigate={navigate} pages={privatePages} />
      <ToastContainer position='bottom-right' autoClose={3000} />
    </ThemeProvider>
  );
};

export default Router;
