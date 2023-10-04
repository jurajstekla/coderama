import { lazy } from 'react';
import Home from '../Components/Pages/Home';
import NotFound from '../Components/Pages/NotFound/NotFound';
import ErrorPage from '../Components/Pages/ErrorPage/ErrorPage';

import { Info, SearchSharp, Favorite } from '@mui/icons-material';

const Search = lazy(() => import('../Components/Pages/Search/Search'));
const Favorites = lazy(() => import('../Components/Pages/Favorites/Favorites'));
const Details = lazy(() => import('../Components/Pages/Details/Details'));

export const pages = [];
export const privatePages = [
  {
    path: `/`,
    exact: true,
    component: Home,
    children: [
      {
        path: `/search`,
        component: Search,
        menuLabel: `Movie search`,
        menuIcon: SearchSharp
      },
      {
        path: `/favorites`,
        component: Favorites,
        menuLabel: `Favorites`,
        menuIcon: Favorite
      },
      {
        path: `/details/:movieId`,
        component: Details,
        menuLabel: `Details`,
        menuIcon: Info
      },
      {
        path: `/`,
        component: Search,
        menuLabel: `Movie search`,
        menuIcon: SearchSharp
      }
    ]
  },
  { path: `/error`, component: ErrorPage },
  { path: `*`, component: NotFound }
];

export const sidebarWidth = 200;
export const headerHeight = 60;
export const modalHeaderFooterHeight = 50;

export const loaderSizes = {
  small: 25,
  medium: 50,
  large: 100
};
