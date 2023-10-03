import { api } from '../api';

export const getAllTablesByFolderIdAction = async (folderId, controller) => {
  const { data } = await api.get(`/api/folders/${folderId}/tables`, { signal: controller.signal });
  return data;
};

export const downloadTableByIdAndTypeAction = (table, type) => {
  api
    .get(`/api/tables/${table.id}`, { responseType: 'blob', headers: { Accept: 'text/csv' } })
    .then(response => {
      if (response.data.size > 0) {
        const blobURL = window.URL.createObjectURL(response.data);
        const tempLink = window.document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        const fileName = `${table.title}.${type.format}`;

        tempLink.setAttribute('download', fileName);
        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }
        window.document.body.appendChild(tempLink);
        tempLink.click();
        window.document.body.removeChild(tempLink);
        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(blobURL);
        }, 100);
      }
    });
};

export const uploadAppendTableAction = async (id, newData, isUpload) => {
  let formData = new FormData();
  formData.append('file', newData);

  const { data } = await api.put(`/api/tables/${id}/rows/import`, formData, {
    params: { append: isUpload },
    headers: { 'content-type': 'multipart/form-data' }
  });

  return data;
};

const getDownloadUrlByType = (type, id) => {
  switch (type) {
    case 'csvTemplate':
      return `/api/lists/${id}/export/csvTemplate`;
    case 'xlsx':
      return `/api/lists/${id}/export/xlsx`;
    case 'csv':
      return `/api/lists/${id}/export/csv`;
    default:
      return `/api/lists/${id}/export/xlsx`;
  }
};

export const getTableColumnsAction = async id => {
  const { data } = await api.get(`/api/tables/${id}/columns/withName`);
  return data;
};

export const getTableDataAction = async id => {
  const { data } = await api.get(`/api/tables/${id}/data`);
  return data;
};
