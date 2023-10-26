import React from 'react';
import { HashRouter } from 'react-router-dom';
import Router from './Router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Router />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
