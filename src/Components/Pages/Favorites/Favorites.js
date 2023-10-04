/* eslint-disable */
import React, { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DisableableBox from '../../../Global/HelperComponents/DisableableBox';
import { headerHeight } from '../../../Global/constants';
import { useFavorites } from './favoritesHelpers';

const Favorites = () => {
  const { data, isLoading, handleRowClick, handleDeleteFromFavorites } = useFavorites();

  const finalColumns = useMemo(
    () => [
      { field: 'Title', headerName: 'Title', flex: 1 },
      { field: 'Type', headerName: 'Type', flex: 1 },
      { field: 'Year', headerName: 'Year', flex: 1 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Details',
        width: 100,
        flex: 1,
        sortable: false,
        getActions: params => [
          <GridActionsCellItem
            onClick={() => handleDeleteFromFavorites(params)}
            icon={<Delete />}
            label='See details...'
          />
        ]
      }
    ],
    []
  );

  return (
    <Box width={1} height={1} sx={{ p: 1 }}>
      <Box sx={{ height: headerHeight / 2, mb: 2 }}>
        <Typography variant='h4'>Favorite movies</Typography>
      </Box>
      <Box width={1} sx={{ height: `calc(100% - ${headerHeight / 2 + 14}px)` }}>
        <DisableableBox loading={isLoading}>
          <DataGrid
            rows={data || []}
            columns={finalColumns}
            onRowClick={handleRowClick}
            disableColumnFilter
            pageSize={50}
            headerHeight={45}
            rowHeight={35}
            rowsPerPageOptions={[50]}
            stickyHeader
            slots={{
              noRowsOverlay: () => (
                <Stack height='100%' alignItems='center' justifyContent='center'>
                  <Typography variant='subtitle1'>No favorite movies ...</Typography>
                </Stack>
              )
            }}
          />
        </DisableableBox>
      </Box>
    </Box>
  );
};

export default Favorites;
