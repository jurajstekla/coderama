import { api } from '../api';
import axios from 'axios';
import { apiData } from '../../Global/apiConstants';
import { defaultThemeColor } from '../../Global/constants';

export const updateThemeAction = (color, image, onSuccess) => {
  let formData = new FormData();
  formData.append('file', image);
  api
    .post(
      `/theme/`,
      formData,
      { params: { color: color.split('#')[1] } },
      {
        headers: { 'content-type': 'multipart/form-data' }
      }
    )
    .then(onSuccess);
};

export const getThemeAction = onSuccess => {
  const logo = axios.request({
    method: 'GET',
    url: `${apiData()}/theme`,
    responseType: 'blob',

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    }
  });

  const color = axios.request({
    method: 'GET',
    url: `${apiData()}/theme/color`,
    responseType: 'json',

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    }
  });

  Promise.all([logo, color]).then(values => {
    var url = undefined;
    if (values[0].data.size > 0) {
      var blob = new Blob([values[0].data], { type: 'image/png' });
      var url = URL.createObjectURL(blob);
    }

    onSuccess({
      logo: url,
      color: values[1].data === '' ? defaultThemeColor : '#' + values[1].data
    });
  });
};

export const getDataByTargetAction = async target => {
  const { data } = await api.get(`/api/${target}`);
  return data;
};

export const updateItemByTargetAction = async (item, target, disableNotification) => {
  const { data } = await api.put(`/api/${target}/${item.id}`, item, {
    ...(!disableNotification && { notify: '' })
  });
  return data;
};

export const addItemByTargetAction = async (target, newData) => {
  const { data } = await api.post(`/api/${target}`, newData);
  return data;
};

export const deleteItemByTargetAndIdAction = async (target, itemId) => {
  const { data } = await api.delete(`/api/${target}/${itemId}`);
  return data;
};

export const customPatchAction = async (url, dataToUpdate) => {
  const { data } = await api.patch(`/api/${url}`, dataToUpdate, { notify: '' });
  return data;
};

export const customUpdateAction = async (url, dataToUpdate) => {
  const { data } = await api.put(`/api/${url}`, dataToUpdate, { notify: '' });
  return data;
};

export const getPermissionsByObjectIdAndTarget = async (objectId, fileType) => {
  const { data } = await api.get(`/api/permissions/types`, { params: { objectId, fileType } });
  return data;
};

export const getInfoAction = async () => {
  const { data } = await axios.request({
    method: 'GET',
    url: `${apiData()}/support/info`,
    responseType: 'json',

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    }
  });
  return data;
};

export const setInfoAction = async infoData => {
  const { data } = await axios.request({
    method: 'POST',
    url: `${apiData()}/support/info`,
    data: infoData,

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    }
  });
  return data;
};
