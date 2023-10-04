import React, { useMemo } from 'react';
import { Box, Button, OutlinedInput, Stack, Typography } from '@mui/material';
import { headerHeight } from '../../../Global/constants';
import { ImageSearch, Info, Search as SearchIcon } from '@mui/icons-material';
import DisableableBox from '../../../Global/HelperComponents/DisableableBox';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Condition from '../../../Global/HelperComponents/Condition';
import { useSearch } from './searchHelpers';
import { StyledOutlineInput } from '../../../Global/StyledComponents/styledComponents';

const Search = () => {
  const {
    rows,
    isLoading,
    searchValue,
    pagination,
    totalRowsCount,
    handleSearch,
    handleRowClick,
    handlePaginationModel
  } = useSearch();

  const finalColumns = useMemo(
    () => [
      { field: 'Title', headerName: 'Title', flex: 1 },
      { field: 'Type', headerName: 'Type', flex: 1 },
      { field: 'Year', headerName: 'Year', flex: 1 },
      {
        field: 'Poster',
        headerName: 'Poster',
        flex: 1,
        renderCell: params => (
          <a href={params.formattedValue} target='_blank'>
            <ImageSearch />
          </a>
        )
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Details',
        width: 100,
        flex: 1,
        sortable: false,
        getActions: params => [
          <GridActionsCellItem
            onClick={() => handleRowClick(params)}
            icon={<Info />}
            label='See details...'
          />
        ]
      }
    ],
    []
  );

  return (
    <Box width={1} height={1} sx={{ p: 1 }}>
      <Box
        width={1}
        sx={{ height: headerHeight / 2, mb: 2 }}
        component='form'
        onSubmit={handleSearch}
      >
        <StyledOutlineInput
          name='searchValue'
          id='searchValue'
          defaultValue={searchValue !== '' ? searchValue : ''}
          required
          placeholder='Search movie title ...'
          endAdornment={
            <Button
              type='submit'
              variant='contained'
              sx={{ height: '100%', boxShadow: 'none', borderRadius: '10px' }}
            >
              <SearchIcon color='action' />
            </Button>
          }
        />
      </Box>
      <Box width={1} sx={{ height: `calc(100% - ${headerHeight / 2 + 14}px)` }}>
        <DisableableBox loading={isLoading}>
          <DataGrid
            rows={rows}
            rowCount={totalRowsCount}
            columns={finalColumns}
            onRowClick={handleRowClick}
            paginationMode='server'
            paginationModel={pagination}
            onPaginationModelChange={handlePaginationModel}
            disableColumnFilter
            headerHeight={45}
            rowHeight={40}
            pageSizeOptions={[10]}
            stickyHeader
            slots={{
              noRowsOverlay: () => (
                <Stack height='100%' alignItems='center' justifyContent='center'>
                  <Condition condition={searchValue !== ''}>
                    <Typography variant='subtitle1'>No results :( try something else</Typography>
                    <Typography variant='subtitle1'>Search for movie results ...</Typography>
                  </Condition>
                </Stack>
              )
            }}
          />
        </DisableableBox>
      </Box>
    </Box>
  );
};

export default Search;
