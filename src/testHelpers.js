import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, createMemoryRouter } from 'react-router-dom';
import { light } from './Theme/palette';
import { colors } from './Components/Home/Config/TabPanelWrapper/TabPanels/ThemePanel/ThemePanelHelpers';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import configureStore from 'redux-mock-store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';
import { createMemoryHistory } from 'history';

/**
 * Helper function to wrap form fields to FormProvider
 */
export function renderWithAllProviders(
  element,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  const Wrapper = ({ children }) => {
    const mockStore = configureStore();
    let store = mockStore({ auth: { loading: false } });
    const theme = createTheme({ palette: light(colors('#33691e')) });

    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    );
  };

  return {
    ...render(element, { wrapper: Wrapper }),
    history
  };
}

export function renderWithThemeProvider(element) {
  const Wrapper = ({ children }) => {
    const theme = createTheme({ palette: light(colors('#33691e')) });

    return (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    );
  };

  return {
    ...render(element, { wrapper: Wrapper })
  };
}
