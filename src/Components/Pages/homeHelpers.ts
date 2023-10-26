import { useState } from 'react';

export const useSidebarToggler = (): [boolean, () => void] => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Handle left drawer

  const sidebarToggle = () => {
    setIsSidebarOpen(prevOpen => !prevOpen);
  };

  return [isSidebarOpen, sidebarToggle];
};
