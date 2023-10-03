import { api } from '../api';

export const addWorkflowStepAction = async taskType => {
  const { data } = await api.post(`/api/taskTypes`, taskType);
  return data;
};

export const editWorkflowStepAction = async taskType => {
  const { data } = await api.put(`/api/taskTypes/${taskType.id}`, taskType);
  return data;
};

export const startWorkflowAction = async workflow => {
  const { data } = await api.post(`/api/activeWorkflows`, workflow, {
    notify: 'workflowHasStarted'
  });
  return data;
};

export const submitTaskAction = async (taskId, state) => {
  const { data } = await api.put(`/api/tasks/${taskId}/state`, state);
  return data;
};
