import { api } from '../api';

export const getDocumentTypesAction = (onSucess, onFinish) => {
  api
    .get(`/api/documentTypes`)
    .then(response => onSucess(response.data))
    .finally(onFinish);
};
export const updateDocumentTypeAction = (data, onSucess) => {
  api.put(`/api/documentTypes/${data.id}`, data).then(response => onSucess(response.data));
};

export const deleteDocumentTypeAction = (id, onSucess) => {
  api.delete(`/api/documentTypes/${id}`).then(onSucess);
};

export const addNewDocumentTypeAction = (data, onSucess) => {
  api.post('/api/documentTypes', data).then(response => onSucess(response.data));
};
