import { getAllFavoriteMovieIds } from '../../Components/Pages/Details/detailsHelpers';
import { api } from '../api';

export const getAllFFavoriteMoviesAction = async () => {
  let movieIds = getAllFavoriteMovieIds();

  const urls = movieIds.map(id =>
    api.get('', {
      params: {
        i: id
      }
    })
  );

  let data = await Promise.all(urls);
  data = data.map(el => {
    return el.data;
  });

  data = data.map(el => {
    return { ...el, id: el.imdbID };
  });

  return data;
};
