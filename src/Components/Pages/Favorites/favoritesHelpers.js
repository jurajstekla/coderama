import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { handleSetIfFavorite } from '../Details/detailsHelpers';
import { getAllFFavoriteMoviesAction } from '../../../api/actions/favoritesActions';

export const useFavorites = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery('favorites', getAllFFavoriteMoviesAction);
  const queryClient = useQueryClient();

  const handleRowClick = ({ row }) => {
    navigate(`/details/${row.id}`);
  };

  const handleDeleteFromFavorites = ({ row }) => {
    handleSetIfFavorite(row.id);
    queryClient.setQueryData('favorites', old => old.filter(item => item.id !== row.id));
  };

  return { data, isLoading, handleRowClick, handleDeleteFromFavorites };
};
