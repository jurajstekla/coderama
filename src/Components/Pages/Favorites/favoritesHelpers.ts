import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { handleSetIfFavorite } from '../Details/detailsHelpers';
import { MovieDetailsResponse, getAllFFavoriteMoviesAction } from '../../../api/actions/favoritesActions';
import { GridRowParams } from '@mui/x-data-grid';

export const useFavorites = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery('favorites', getAllFFavoriteMoviesAction);
  const queryClient = useQueryClient();

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/details/${params.row.id}`);
  };

  const handleDeleteFromFavorites = (params: GridRowParams) => {
    handleSetIfFavorite(params.row.id);
    queryClient.setQueryData<MovieDetailsResponse[]|undefined>('favorites', (old ) => 
       (old).filter(item => item.id !== params.row.id)  
    );
  };

  return { data, isLoading, handleRowClick, handleDeleteFromFavorites };
};
