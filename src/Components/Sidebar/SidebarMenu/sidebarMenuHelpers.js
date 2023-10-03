import { useNavigate, useLocation } from 'react-router-dom';

export const useMenu = sidebarToggle => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const switchLocation = loc => {
    navigate(loc);
    sidebarToggle();
  };
  return [location, switchLocation];
};
