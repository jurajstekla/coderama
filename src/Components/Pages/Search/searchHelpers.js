import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSearchResultsAction } from '../../../api/actions/searchActions';
import { setRows, setSearchValue } from '../../../api/redux/slices/movieTableSlice';
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
  const { rows, searchValue } = useSelector(state => state.movieTable);

  const handleSearch = e => {
    e.preventDefault();
    const value = e.target.elements.searchValue.value;
    setIsLoading(true);
    dispatch(setSearchValue(value));
    getSearchResultsAction(value)
      .then(data => {
        if (data?.Response === 'False') {
          dispatch(
            addNotification({
              type: 'warning',
              message: 'We didnt find any match for entered term...'
            })
          );
        }
        dispatch(setRows(formatResponse(data.Search || [])));
      })
      .finally(() => setIsLoading(false));
  };

  const handleRowClick = ({ row }) => {
    navigate(`/details/${row.id}`);
  };

  return { rows, isLoading, searchValue, handleSearch, handleRowClick };
};
