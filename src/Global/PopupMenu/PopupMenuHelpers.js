import { useState, useRef, useEffect } from 'react';

export const usePopupMenu = anchorRef => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open, anchorRef]);

  return [open, handleOpen, handleClose];
};
