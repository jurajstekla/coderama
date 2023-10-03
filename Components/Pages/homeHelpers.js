import { useState } from 'react';

export const useSidebarToggler = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState();
  // Handle left drawer

  const sidebarToggle = () => {
    setIsSidebarOpen(prevOpen => !prevOpen);
  };

  return [isSidebarOpen, sidebarToggle];
};
