import { createUrlContent } from '../../Global/globalFunctions';
import { api } from '../api';

export const createHtmlAction = async (html, htmlInfo) => {
  const { data } = await api.post(`/api/htmls`, htmlInfo);
  return data;
};

export const updateHtmlContentAction = async (htmlId, content) => {
  let formData = new FormData();
  formData.append('file', content);

  const { data } = await api.put(`/api/htmls/${htmlId}/contents`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    notify: ''
  });

  return data;
};

export const downloadHtmlAction = html => {
  api.get(`/api/htmls/${html.id}/contents`, { responseType: 'blob' }).then(response => {
    if (response.data.size > 0) {
      var blob = new Blob([response.data], { type: 'text/html' });

      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = window.document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', html.title);
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

export const getHtmlContentAction = async (htmlId, controller) => {
  const { data } = await api.get(`/api/htmls/${htmlId}/contents`, {
    responseType: 'blob',
    signal: controller.signal,
    errorNotify: 'noContent'
  });

  return createUrlContent(data, 'text/html');
};
