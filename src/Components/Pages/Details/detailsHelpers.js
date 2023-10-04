import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getMovieDetialsAction } from '../../../api/actions/detailsActions';

const isMovieFavorite = movieId => {
  const favoriteMovies = localStorage.getItem('favoriteMovies');
  let movieIds = JSON.parse(favoriteMovies) || [];

  return movieIds.includes(movieId);
};

export const getAllFavoriteMovieIds = () => {
  const favoriteMovies = localStorage.getItem('favoriteMovies');
  let movieIds = JSON.parse(favoriteMovies) || [];
  return movieIds;
};

export const handleSetIfFavorite = movieId => {
  let movieIds = getAllFavoriteMovieIds();
  if (movieIds.includes(movieId)) {
    movieIds = movieIds.filter(id => id !== movieId);
  } else {
    movieIds = [...movieIds, movieId];
  }
  localStorage.setItem('favoriteMovies', JSON.stringify([...new Set(movieIds)]));
};

export const useMovieDetails = movieId => {
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(isMovieFavorite(movieId));
  const { data, isLoading } = useQuery(
    ['movie', { movieId: movieId }],
    () => getMovieDetialsAction(movieId),
    {
      enabled: movieId !== '',
      refetchOnMount: false
    }
  );

  const handleIsFavorite = () => {
    handleSetIfFavorite(movieId);
    setIsFavorite(prev => !prev);
    queryClient.invalidateQueries('favorites');
  };

  return { data, isLoading, isFavorite, handleIsFavorite };
};
