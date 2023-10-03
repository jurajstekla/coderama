import { isEmpty } from 'lodash';
import { api } from '../api';

export const getAllFolderPreferenciesAction = (folderId, onSuccess, onFinish) => {
  api
    .get(`/api/folders/${folderId}/preferences`)
    .then(response => {
      if (!isEmpty(response.data)) {
        onSuccess([{ ...response.data[0], preferenceType: 'view' }]);
      } else {
        onSuccess(response.data);
      }
    })
    .finally(onFinish);
};

export const getFolderPreferenciesByUserAction = (username, folderId, onSuccess, onFinish) => {
  api
    .get(`/api/preferences/users/${username}/folder/${folderId}`)
    .then(response => {
      if (!isEmpty(response.data)) {
        onSuccess([{ ...response.data[0], preferenceType: 'view' }]);
      } else {
        onSuccess(response.data);
      }
    })
    .finally(() => onFinish());
};

export const getAllFolderPreferenciesByAuthorityIdAction = (
  authorityId,
  folderId,
  onSuccess,
  onFinish
) => {
  api
    .get(`/api/preferences/authorities/${authorityId}/folder/${folderId}`)
    .then(response => {
      if (!isEmpty(response.data)) {
        onSuccess([{ ...response.data[0], preferenceType: 'view' }]);
      } else {
        onSuccess(response.data);
      }
    })
    .finally(() => onFinish());
};

export const getAuthorityPermissionsByTargetIdAction = (targetId, onSuccess, onFinish) => {
  api
    .get(`/api/authorities/withIdAndPermissionsByTargetId/${targetId}`)
    .then(response => onSuccess(response.data))
    .finally(() => onFinish());
};

export const getFolderPermissionsAction = (folderId, onSuccess) => {
  api
    .get(`/api/permissions/permissionTypesByFolderId/${folderId}`)
    .then(response => onSuccess(response.data));
};

export const getFolderDataByTargetAction = async (folderId, target) => {
  const { data } = await api.get(`/api/folders/${folderId}/${target}`);
  return { rows: data.rows, columns: data.columns };
};

export const getFolderDataAction = async (folderId, controller) => {
  const folderData = api.get(`/api/folders/${folderId}/data`, { signal: controller.signal });
  const folderPermissions = api.get(`/api/permissions/permissionTypesByFolderId/${folderId}`, {
    signal: controller.signal
  });

  const [data, permissions] = await Promise.all([folderData, folderPermissions]);

  return {
    rows: data.data.rows,
    columns: data.data.columns,
    preferencedView: data.data.preferencedView,
    permissions: permissions.data
  };
};

export const getFolderFiles = async folderId => {
  const { data } = await api.get(`/api/folders/${folderId}/documentTemplates`);
  return data;
};

export const deleteItemsByTargetAndIds = async (target, ids, folderId) => {
  const { data } = await api.delete(`/api/folders/${folderId}/bulkData`, {
    data: ids,
    params: { target }
  });
  return data;
};

export const moveFolderAction = async (idFrom, parentId) => {
  const { data } = await api.put(
    `/api/folders/${idFrom}/parentId`,
    { parentId },
    { errorNotify: 'cantMoveFolder' }
  );
  return data;
};

export const searchFoldersAction = async (folderId, settings) => {
  const { data } = await api.get(`/api/folders/${folderId !== '' ? folderId + '/' : ''}search`, {
    params: { ...settings }
  });
  return data;
};
