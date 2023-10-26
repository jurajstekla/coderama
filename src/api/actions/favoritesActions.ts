import { getAllFavoriteMovieIds } from '../../Components/Pages/Details/detailsHelpers';
import { api } from '../api';
export type MovieDetailsResponse = {
  id:string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
   Language:string;
  Country:string;
  Awards:string;
  Poster:string;
  Metascore: number;
  imdbRating: number;
  imdbVotes: number;
  imdbID: string;
  Type: string;
  DVD: Date;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: Boolean;
}

export const getAllFFavoriteMoviesAction = async ():Promise<MovieDetailsResponse[]> => {
  let movieIds = getAllFavoriteMovieIds();

  const urls = movieIds.map((id:string) =>
    api.get('', {
      params: {
        i: id
      }
    })
  );

  let responses = await Promise.all(urls);
  let data:MovieDetailsResponse[] = responses.map((response)=>{
    return response?.data;
  })

  data = data.map(el => {
    return { ...el, id: el.imdbID };
  });

  return data;
};
