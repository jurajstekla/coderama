import React, { FC, ReactNode, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, SxProps } from '@mui/material';
import { useTheme } from '@mui/system';
import { useDrag, useDrop, DragObjectFactory, DropTargetMonitor, XYCoord } from 'react-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Condition from './Condition';

interface ListItemProps {
  name: string;
  children: ReactNode;
  active: boolean;
  border: boolean;
  draggable: boolean;
  onDragEnd: (i: number, y: number) => void;
  index: number;
  sx: SxProps;
}

const ListItem: FC<ListItemProps> = ({
  name,
  children,
  active,
  border,
  onDragEnd,
  index,
  draggable,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    canDrag: draggable,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const ref = useRef<HTMLDivElement>(null);
  // useDrop - the list item is also a drop area
  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (
      item: { index: number; type: string; id: string },
      monitor: DropTargetMonitor<unknown, unknown>
    ) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect() || { bottom: 0, top: 0 };
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = (monitor.getClientOffset() as XYCoord).y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      onDragEnd(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  dropRef(ref);

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;

  return (
    <Box
      {...props}
      ref={ref}
      width={1}
      sx={{
        cursor: 'pointer',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&:hover': {
          cursor: draggable ? 'move' : 'pointer',
          boxShadow: theme.palette.shadow.primary,
          borderRadius: 1
        },
        borderBottom: (border && theme.palette.border) as string,
        boxShadow: (active && theme.palette.shadow.primary) as string,
        borderRadius: (active && 1) as number,
        opacity
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Condition condition={draggable}>
          <DragIndicatorIcon color='disabled' />
        </Condition>
        <Typography
          sx={{
            ml: 1,
            color: (active && theme.palette.primary.main) as string,
            fontWeight: (active && 'bold') as string,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-all',
            whiteSpace: 'normal'
          }}
          title={name}
        >
          {name}
        </Typography>
      </Box>

      <Box height={1} sx={{ ml: 'auto', display: 'flex' }}>
        {children}
      </Box>
    </Box>
  );
};

ListItem.defaultProps = { border: true, draggable: false, index: 0 };
export default ListItem;
