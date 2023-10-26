import React, { FC, ReactNode } from 'react';
import { Grid, GridDirection } from '@mui/material';
interface GridDividerProps {
  children: ReactNode[];
  direction: GridDirection;
  shadowing: boolean;
}
const GridDivider: FC<GridDividerProps> = ({ children, direction, shadowing }) => {
  const blocksAmount = 12 / children.length;

  return (
    <Grid container width={1} height={1} direction={direction} sx={{ overflow: 'auto' }}>
      {children.map((child, index) => (
        <Grid
          lg={blocksAmount}
          md={blocksAmount}
          xs={12}
          item
          key={index}
          sx={{
            height: '100%',
            overflow: 'auto',
            padding: 1,
            boxShadow: (shadowing && `0px 2px 7px rgb(0 0 0 / 0.1)`) as string
          }}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

GridDivider.defaultProps = {
  direction: 'row',
  shadowing: true
};

export default GridDivider;
