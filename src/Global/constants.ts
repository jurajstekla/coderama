import { lazy, LazyExoticComponent } from 'react';
import { Info, SearchSharp, Favorite, SvgIconComponent } from '@mui/icons-material';

const Search = lazy(() => import('../Components/Pages/Search/Search'));
const Favorites = lazy(() => import('../Components/Pages/Favorites/Favorites'));
const Details = lazy(() => import('../Components/Pages/Details/Details'));
const Home = lazy(() => import('../Components/Pages/Home'));

export interface Page {
  path: string;
  component: LazyExoticComponent<React.FC>;
  menuLabel?: string;
  menuIcon?: SvgIconComponent;
  children?: Page[];
  exact?: boolean;
}

export const privatePages: Page[] = [
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
  { path: `*`, component: Home }
];

export const sidebarWidth = 200;
export const headerHeight = 60;
export const modalHeaderFooterHeight = 50;

export const loaderSizes = {
  small: 25,
  medium: 50,
  large: 100
};
