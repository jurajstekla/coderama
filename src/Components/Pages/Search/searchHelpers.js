import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSearchResultsAction } from '../../../api/actions/searchActions';
import {
  setPaginationModel,
  setRows,
  setSearchValue,
  setTotalRowsCount
} from '../../../api/redux/slices/movieTableSlice';
import { addNotification } from '../../../api/redux/slices/notificationsSlice';

export const formatResponse = data => {
  return data.map(el => {
    return { ...el, id: el.imdbID };
  });
};

export const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { rows, searchValue, totalRowsCount, pagination } = useSelector(state => state.movieTable);

  const handlePaginationModel = e => {
    dispatch(setPaginationModel(e));
    handleChangePage(e.page + 1);
  };

  const handleChangePage = page => {
    setIsLoading(true);

    getSearchResultsAction(searchValue, page)
      .then(data => {
        dispatch(setRows(formatResponse(data?.Search || [])));
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearch = e => {
    e.preventDefault();
    const value = e.target.elements.searchValue.value;
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

  const handleRowClick = ({ row }) => {
    navigate(`/details/${row.id}`);
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
