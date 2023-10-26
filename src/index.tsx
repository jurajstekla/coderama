import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './api/redux/store';
import { Provider } from 'react-redux';
import { injectStore } from './api/api';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackScreen from './Global/HelperComponents/ErrorFallbackScreen';

injectStore(store);

function AppWithCallbackAfterRender() {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<AppWithCallbackAfterRender />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
