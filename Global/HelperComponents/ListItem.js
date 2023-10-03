import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useDrag, useDrop } from 'react-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Condition from '../../Global/HelperComponents/Condition';

const ListItem = ({
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

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      onDragEnd(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;

  return (
    <Box
      {...props}
      ref={dragDropRef}
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
        borderBottom: border && theme.palette.border,
        boxShadow: active && theme.palette.shadow.primary,
        borderRadius: active && 1,
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
            color: active && theme.palette.primary.main,
            fontWeight: active && 'bold',
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

ListItem.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  border: PropTypes.bool,
  draggable: PropTypes.bool,
  onDragEnd: PropTypes.func,
  index: PropTypes.number
};
ListItem.defaultProps = { border: true, draggable: false, index: 0 };
export default ListItem;
