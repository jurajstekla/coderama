import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallbackScreen: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      hej no nieco sa pokazilo{error.message}
      <button onClick={resetErrorBoundary}>reset page</button>
    </div>
  );
};

export default ErrorFallbackScreen;
