import axios from 'axios';
import { setLoading, setIsLogged, setUsername } from '../redux/slices/authSlice';
import { apiData } from '../../Global/apiConstants';
import { api } from '../api';
import { setCookie, deleteCookie, getCookieValue, getBasename } from '../../Global/globalFunctions';
import { addNotification } from '../redux/slices/notificationsSlice';
import { resetState } from '../redux/slices/dataTableSlice';
import { resetState as resetTreeState } from '../redux/slices/treeSlice';

export const authUserAction = (authData, success) => async dispatch => {
  dispatch(setLoading(true));

  const config = {
    method: 'POST',
    url: `${apiData()}/oauth/token`,
    responseType: 'json',

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    },
    data: {
      grant_type: 'password',
      username: authData.username,
      password: authData.password
    }
  };

  await axios
    .request(config)
    .then(response => {
      isUserAdminAction(response.data.access_token, isAdmin => {
        setCookie('accessToken', response.data.access_token);
        setCookie('refreshToken', response.data.refresh_token);
        setCookie('username', authData.username);
        setCookie('authority', isAdmin);

        dispatch(setUsername(authData.username));
        dispatch(setIsLogged(true));
        success();
      });
    })
    .catch(err => {
      if (err.response.status === 400) {
        dispatch(
          addNotification({
            type: 'error',
            message:
              err.response.data.error_description === 'User is disabled'
                ? 'userDisabled'
                : 'badCredentials'
          })
        );
      } else {
        dispatch(addNotification({ type: 'error', message: 'userDoesntExist' }));
      }
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const authUserWithRefreshTokenAction = onSuccess => dispatch => {
  const config = {
    method: 'POST',
    url: `${apiData()}/oauth/token`,
    responseType: 'json',

    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    },
    data: {
      grant_type: 'refresh_token',
      username: getCookieValue('username'),
      refresh_token: getCookieValue('refreshToken')
    }
  };

  axios
    .request(config)
    .then(response => {
      setCookie('accessToken', response.data.access_token);
      setCookie('refreshToken', response.data.refresh_token);
      onSuccess();
    })
    .catch(() => {
      dispatch(setIsLogged(false));
      dispatch(resetState());
      dispatch(resetTreeState());
    });
};

const isUserAdminAction = (accessToken, onSuccess) => {
  const config = {
    method: 'GET',
    url: `${apiData()}/api/users/isAdmin/`,
    headers: {
      'content-type': 'application/json'
    },
    params: {
      access_token: accessToken
    }
  };

  axios
    .request(config)
    .then(response => {
      onSuccess(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

export const logoutAction = onSuccess => dispatch => {
  dispatch(setIsLogged(false));
  dispatch(resetState());
  dispatch(resetTreeState());
  api.delete('/api/logout').finally(() => {
    logout();
    if (onSuccess) {
      onSuccess();
    } else {
      //eslint-disable-next-line
      window.history.pushState('', '', process.env.PUBLIC_URL);
    }
  });
};

export const logout = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('username');
  deleteCookie('authority');
};

export const resetPasswordAction = async (user, email) => {
  const lang = window.localStorage.getItem('i18nextLng');
  const config = {
    method: 'POST',
    url: `${apiData()}/support/password/${user}/${email}/${lang}`,
    responseType: 'json',
    headers: {
      Authorization: 'Basic bWlhLWRtcy1ndWk6c2VjcmV0',
      'Content-Type': 'application/json'
    }
  };

  const { data } = await axios.request(config);
  return data;
};
