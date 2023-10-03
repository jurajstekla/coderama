import { api } from '../api';
import { getCookieValue } from '../../Global/globalFunctions';
import { toast } from 'react-toastify';

export const getTreeNodesAction = async () => {
  const { data } = await api.get(`/api/folders/structure/root`);
  return {
    id: 'root',
    name: 'root',
    children: [...data]
  };
};

export const createFolderAction = async (id, name) => {
  const newNode = {
    name: name,
    creator: getCookieValue('username'),
    created: '',
    modifier: getCookieValue('username'),
    modified: '',
    parentId: id
  };

  const { data } = await api.post(`/api/folders`, newNode);
  return data;
};

export const updateFolderPreferencesAction = async (folderId, preferences) => {
  const { data } = await api.put(
    '/api/preferences',
    preparePreferencesDataToUpdate(folderId, preferences),
    {
      notify: ''
    }
  );
  return data;
};

export const updateFolderColumnsAction = async (folderId, newData) => {
  const { data } = await api.put(`/api/folders/${folderId}/folderColumns`, newData);
  return data;
};

export const updateFolderPermissionsAction = (folderId, data, t) => {
  const id = toast.loading(t('permissionsSave'));

  api
    .put(`/api/permissions/byTargetId/${folderId}`, data)
    .then(() => {
      toast.update(id, {
        render: t('permissionsSave'),
        type: 'success',
        isLoading: false,
        autoClose: 1500
      });
    })
    .catch(() => {
      toast.update(id, {
        render: t('permissionsSaveFail'),
        type: 'error',
        isLoading: false,
        autoClose: 1500
      });
    });
};

// v pripade ze preferencia sa dedi od parenta, tak ak ju zmenim tak chcem vytvorit novu preferenciu pre svoj folder .. preto vymazem id a objectid dam aktualny folder id
const preparePreferencesDataToUpdate = (folderId, folderPreferences) => {
  const preferenceCopy = [...folderPreferences];
  const username = getCookieValue('username');
  const isAdmin = getCookieValue('authority');
  if (folderId !== folderPreferences[0].objectId) {
    preferenceCopy.forEach(pref => {
      delete pref.id;
      pref.objectId = folderId;
      !isAdmin && (pref.recipient = username);
    });
  } else {
    preferenceCopy.forEach(pref => {
      if (!isAdmin) {
        if (pref.recipient !== username) {
          delete pref.id;
          pref.recipient = username;
        }
      }
    });
  }
  return preferenceCopy;
};
