import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RoutesWrapper = ({ pages, navigate }) => {
  return (
    <Routes>
      {pages.map(page => (
        <Route
          exact={page.exact}
          path={page.path}
          element={React.createElement(page.component, { navigate: navigate })}
          key={'page' + page.path}
        >
          {page.children &&
            page.children
              .map(child => (
                <Route
                  path={child.path === '/home' ? '' : child.path}
                  index={child.path === '/home'}
                  element={React.createElement(child.component, { navigate: navigate })}
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
