import { api } from '../api';

export const getSearchResultsAction = async (searchValue, page) => {
  const { data } = await api.get('', {
    params: {
      s: searchValue,
      page: page
    }
  });
  return data;
};
