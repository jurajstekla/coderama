import { api } from '../api';

export const getAllAvailableColumnsAction = (onSuccess, onFinish) => {
  api
    .get('/api/customPropertyDefinitions')
    .then(response => {
      onSuccess(response.data);
    })
    .finally(() => onFinish());
};
