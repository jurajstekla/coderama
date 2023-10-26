import { api } from '../api';
export interface Result {
  Title: String;
  Year:String;
  imdbID:String;
  Type:String;
  Poster:String;
}
interface SearchResponse {
  Search: Result[];
  totalResults:String;
  Response:String;
}
export const getSearchResultsAction = async (searchValue:string, page:number): Promise<SearchResponse> => {
  const { data } = await api.get('', {
    params: {
      s: searchValue,
      page: page
    }
  });
  return data;
};
