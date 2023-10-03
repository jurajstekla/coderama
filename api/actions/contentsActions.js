import { createUrlContent } from '../../Global/globalFunctions';
import { api } from '../api';

export const getDocumentContentByVersionAction = async (documentId, version) => {
  const { data } = await api.get(
    `/api/contents/byDocumentId${version ? 'AndVersion' : ''}/${documentId}/${
      version ? version : ''
    }`,
    {
      responseType: 'blob'
    }
  );

  const blob = new Blob(['\ufeff', data]);

  return window.URL.createObjectURL(data?.type === 'text/plain' ? blob : data);
};

export const generateThumbnailAction = async contentId => {
  const { data } = await api.get(`/api/contents/${contentId}/thumbnails`, {
    errorNotify: 'thumbnailError',
    responseType: 'blob'
  });
  return createUrlContent(data, 'image/png');
};

export const getThumbnailByVersionAction = async (documentId, version) => {
  const { data } = await api.get(
    `/api/contents/byDocumentIdAndVersion/${documentId}/${version}/thumbnails`,
    {
      responseType: 'blob'
    }
  );
  return createUrlContent(data, 'image/png');
};

export const getHtmlContentAction = async htmlId => {
  const { data } = await api.get(`/api/contents/byDocumentId/${htmlId}`, {
    headers: {
      'content-type': 'application/json'
    }
  });
  return data;
};

export const uploadDocumentContentAction = async (document, documentId) => {
  let formData = new FormData();
  formData.append('file', document);

  const { data } = await api.post(`/api/contents/byDocumentId/${documentId}`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  });
  return data;
};

export const downloadDocumentByIdAndVersionAction = (document, version) => {
  api
    .get(`/api/contents/byDocumentIdAndVersion/${document.id}/${version}`, {
      responseType: 'blob'
    })
    .then(response => {
      if (response.data.size > 0) {
        var blob = new Blob([response.data], { type: response.data.type });

        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = window.document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', document.title.split('.')[0]);
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
