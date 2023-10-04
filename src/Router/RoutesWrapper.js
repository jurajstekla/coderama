import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import FallbackLoader from '../Global/HelperComponents/FallbackLoader';

const RoutesWrapper = ({ pages }) => {
  return (
    <Routes>
      {pages.map(page => (
        <Route
          exact={page.exact}
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

RoutesWrapper.propTypes = {
  pages: PropTypes.array.isRequired,
  navigate: PropTypes.any
};

export default RoutesWrapper;
