import { FormEvent, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Result, getSearchResultsAction } from '../../../api/actions/searchActions';
import {
  setPaginationModel,
  setRows,
  setSearchValue,
  setTotalRowsCount
} from '../../../api/redux/slices/movieTableSlice';
import { addNotification } from '../../../api/redux/slices/notificationsSlice';
import { GridCellParams, GridPaginationModel, GridRowParams } from '@mui/x-data-grid';

export const formatResponse = (data:Result[]) => {
  return data.map(el => {
    return { ...el, id: el.imdbID };
  });
};

export const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { rows, searchValue, totalRowsCount, pagination } = useSelector((state:RootStateOrAny) => state.movieTable);

  const handlePaginationModel = (e:GridPaginationModel) => {
    dispatch(setPaginationModel(e));
    handleChangePage(e.page + 1);
  };

  const handleChangePage = (page:number) => {
    setIsLoading(true);

    getSearchResultsAction(searchValue, page)
      .then(data => {
        dispatch(setRows(formatResponse(data?.Search || [])));
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    const {value} = form.elements.namedItem('searchValue') as HTMLInputElement;
    dispatch(setSearchValue(value));

    setIsLoading(true);
    getSearchResultsAction(value, 1)
      .then(data => {
        if (data?.Response === 'False') {
          dispatch(
            addNotification({
              type: 'warning',
              message: 'We didnt find any match for entered term...'
            })
          );
        }
        dispatch(setTotalRowsCount(data?.totalResults || 0));
        dispatch(setRows(formatResponse(data?.Search || [])));
      })
      .finally(() => setIsLoading(false));
  };

  const handleRowClick = (params:GridRowParams) => {
    navigate(`/details/${params.row.id}`);
  };

  return {
    rows,
    isLoading,
    searchValue,
    pagination,
    totalRowsCount,
    handleSearch,
    handleRowClick,
    handlePaginationModel
  };
};
