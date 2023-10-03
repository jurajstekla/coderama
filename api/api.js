import axios from 'axios';
import { apiData } from '../Global/apiConstants';
import { getBasename, getCookieValue } from '../Global/globalFunctions';
import { authUserWithRefreshTokenAction } from './actions/authActions';
import { addNotification } from './redux/slices/notificationsSlice';
let store;
// export const cancelTokenSource = axios.CancelToken.source();

export const api = axios.create({
  baseURL: apiData(),
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  function (config) {
    config.params = { ...config.params, access_token: getCookieValue('accessToken') };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    if (response.config.notify !== undefined) {
      store.dispatch(
        addNotification({
          type: 'success',
          message: response.config.notify !== '' ? response.config.notify : 'successfullAction'
        })
      );
    }
    return response;
  },
  function (error) {
    // console.log(error.response, error, 'api js ');
    if (error.response) {
      const fullMessage = error.response.data
        ? error.response.data.message
        : error.response.message;

      if (error.config.errorNotify !== undefined) {
        store.dispatch(
          addNotification({
            type: 'error',
            message:
              error.config.errorNotify !== '' ? error.config.errorNotify : 'somethingWentWrong',
            fullMessage
          })
        );
      }
      if (error.response.status === 401) {
        //token has expired or is not valid
        //send refreshtoken
        if (error.response.config.url === '/api/logout') return;
        else store.dispatch(authUserWithRefreshTokenAction(() => api(error.config)));
      } else if (error.response.status === 404) {
        //not found
        store.dispatch(addNotification({ type: 'error', message: '404 Fot found', fullMessage }));
      } else if (error.response.status === 403) {
        //not authorized
        store.dispatch(addNotification({ type: 'error', message: 'notAllowed', fullMessage }));
      } else if (error.response.status === 409) {
        // object in use
        store.dispatch(addNotification({ type: 'warning', message: 'objectInUse', fullMessage }));
      } else if (error.response.status === 500) {
        store.dispatch(addNotification({ type: 'error', message: 'cannotProcess', fullMessage }));
      } else {
        store.dispatch(
          addNotification({ type: 'error', message: 'somethingWentWrong', fullMessage })
        );
      }
    } else {
      if (error.response?.config.url === '/api/logout') return;
      else if (error.message && error.message !== 'canceled') {
        store.dispatch(addNotification({ type: 'error', message: 'networkError' }));
        // window.location.pathname = `${getBasename()}/error`;
      }
    }
    return Promise.reject(error);
  }
);

export const injectStore = _store => {
  store = _store;
};
