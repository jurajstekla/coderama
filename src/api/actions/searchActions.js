import { api } from '../api';

export const getSearchResultsAction = async searchValue => {
  const { data } = await api.get('', {
    params: {
      s: searchValue
    }
  });
  return data;
};
