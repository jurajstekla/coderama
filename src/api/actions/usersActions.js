import { parseUsers } from '../../Global/globalHooks';
import { api } from '../api';

export const getAllUsersAndAuthoritiesAction = (target, onSuccess, onFinish) => {
  // declaration of api calls must be inside of function, otherwise it would be called
  // every time when file is loaded

  const getAllUsers = api.get(`/api/users`);
  const getAllAuthorities = api.get(`/api/authorities${target === 'users' ? '/idAndName' : ''}`);

  Promise.all([getAllUsers, getAllAuthorities])
    .then(values => {
      onSuccess({ users: values[0].data, authorities: values[1].data });
    })
    .finally(onFinish);
};

export const getAllUsersAction = async () => {
  const { data } = await api.get(`/api/users`);
  return parseUsers(data);
};

export const changePasswordAction = async newData => {
  const { data } = await api.put(`/api/users/password`, newData, {
    errorNotify: 'wrongCurrentPassword',
    notify: ''
  });
  return data;
};
