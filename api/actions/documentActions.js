import { toast } from 'react-toastify';
import { parseCustomProperties } from '../../Components/Home/Dashboard/DataTable/dataTableHelpers';
import { createUrlContent } from '../../Global/globalFunctions';
import { api } from '../api';
import { addRow } from '../redux/slices/dataTableSlice';
import { uploadDocumentContentAction } from './contentsActions';

export const uploadDocumentAction =
  (data, document, handleClose, handleStartWorkflow, t) => dispatch => {
    api.post('/api/documents', data, { errorNotify: 'checkInput' }).then(response => {
      if (response.data) {
        const id = toast.loading(t('documentIsUploading'));
        handleClose();
        uploadDocumentContentAction(document, response.data.id)
          .then(() => {
            handleStartWorkflow(response.data.id);

            dispatch(addRow({ ...response.data, ...parseCustomProperties(response.data) }));
            toast.update(id, {
              render: t('documentUploaded'),
              type: 'success',
              isLoading: false,
              autoClose: 1500
            });
          })
          .catch(() => {
            toast.update(id, {
              render: t('uploadFailed'),
              type: 'error',
              isLoading: false,
              autoClose: 1500
            });
          });
      }
    });
  };

export const getAllDataForDocumentDetailsAction = async (documentId, controller) => {
  const thumbnailApi = api.get(`/api/contents/byDocumentId/${documentId}/thumbnails`, {
    responseType: 'blob',
    signal: controller.signal
  });
  const versionsApi = api.get(`/api/contents/byDocumentId/${documentId}/versions`, {
    signal: controller.signal
  });
  const detailsApi = api.get(`/api/documents/details/${documentId}`, {
    signal: controller.signal
  });

  const [thumb, vers, deta] = await Promise.all([thumbnailApi, versionsApi, detailsApi]);
  return {
    thumbnail: createUrlContent(thumb.data, 'image/png'),
    versions: vers.data,
    details: deta.data
  };
};

export const getAuditLogsAction = async documentId => {
  const documentLogs = api.get(`/api/audit`, { params: { targetId: documentId } });
  const workflowLogs = api.get(`/api/workflowLogs`, { params: { documentId: documentId } });

  const [docLog, workLog] = await Promise.all([documentLogs, workflowLogs]);

  return { documentLogs: docLog.data, workflowLogs: workLog.data };
};

export const checkInDocumentAction = async (documentId, content) => {
  let formData;
  if (content) {
    formData = new FormData();
    formData.append('file', content);
  } else {
    formData = null;
  }

  const { data } = await api.put(`/api/documents/checkin/${documentId}`, formData, {
    headers: content !== null && { 'content-type': 'multipart/form-data' }
  });
  return data;
};

export const searchDocumentsAction = async (folderId, settings) => {
  const { data } = await api.get('/api/documents/search', {
    params: { ...(folderId !== '' && { folderId }), ...settings }
  });
  return data;
};

export const updateCustomPropertiesAction = async (id, customProperties) => {
  const { data } = await api.put(`/api/documents/${id}/customProperties`, customProperties, {
    errorNotify: 'checkInput'
  });
  return data;
};
