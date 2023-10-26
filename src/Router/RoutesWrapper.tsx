import React, { Suspense, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackLoader from '../Global/HelperComponents/FallbackLoader';
import { Page } from '../Global/constants';

interface RouterWrapperProps {
  pages: Page[];
}
const RoutesWrapper: FC<RouterWrapperProps> = ({ pages }) => {
  return (
    <Routes>
      {pages.map(page => (
        <Route
          path={page.path}
          element={React.createElement(page.component)}
          key={'page' + page.path}
        >
          {page.children &&
            page.children.map(child => (
              <Route
                path={child.path}
                element={
                  <Suspense fallback={<FallbackLoader />}>
                    {React.createElement(child.component)}
                  </Suspense>
                }
                key={'page' + page.path}
              />
            ))}
        </Route>
      ))}
    </Routes>
  );
};

export default RoutesWrapper;
