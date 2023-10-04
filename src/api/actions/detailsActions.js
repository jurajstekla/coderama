import { api } from '../api';

export const getMovieDetialsAction = async movieId => {
  const { data } = await api.get('', {
    params: {
      i: movieId
    }
  });
  return data;
};
