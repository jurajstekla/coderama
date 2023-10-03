import { api } from '../api';

export const addNewCustomPropertiesAction = async (dataToAdd, documentId) => {
  const { data } = await api.post(`/api/customProperties/byDocumentId/${documentId}`, dataToAdd);
  return data;
};
