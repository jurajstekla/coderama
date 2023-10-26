import { useState, useRef, useEffect, RefObject } from 'react';

export const usePopupMenu = (
  anchorRef: RefObject<HTMLElement | null>
): [boolean, () => void, (event: MouseEvent | TouchEvent) => void] => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && (anchorRef.current as HTMLElement).contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open, anchorRef]);

  return [open, handleOpen, handleClose];
};
