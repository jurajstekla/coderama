import { api } from '../api';

export const deleteTableRowAction = async id => {
  return await api.delete(`/api/rows/${id}`);
};

export const deleteTableRowsAction = async data => {
  return await api.delete('/api/rows/byIds', { data: data });
};
