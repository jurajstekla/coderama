import { api } from '../api';

export const getColumnTypesAction = (onSucess, onFinish) => {
  api
    .get('/api/columnTypes')
    .then(response => onSucess(response.data))
    .finally(onFinish);
};

export const addColumnTypeAction = (data, onSucess) => {
  api.post('/api/columnTypes', data).then(response => onSucess(response.data));
};

export const deleteColumnTypeAction = (id, onSucess) => {
  api.delete(`/api/columnTypes/${id}`).then(onSucess);
};

export const updateColumnTypeAction = (data, onSucess) => {
  api
    .put(`/api/columnTypes/${data.id}`, data, { notify: '' })
    .then(response => onSucess(response.data));
};
