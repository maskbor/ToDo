import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS
} from '../Constants/Auth';

export const logout = () => dispatch => {
  axios.get('/api/logout').then(res => {
    dispatch({type: LOGOUT_SUCCESS});
  })
  axios.defaults.headers.common['Authorization'] = "";
  localStorage.removeItem("auth");
  window.location.href = '/login'
};

export const loginUser = (login, password) => dispatch => {
  dispatch({type: LOGIN_REQUEST});

  if (!!login && !!password) {
    axios.post('/api/login', {
        email: login,
        password: password
      }
    ).then(res => {
        localStorage.setItem("auth", JSON.stringify({token_type: res.data.token_type, access_token: res.data.access_token}));
        axios.defaults.headers.common['Authorization'] = res.data.token_type+" "+res.data.access_token;
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
        window.location.href = '/'
      }).catch(function (error) {
        dispatch({type: LOGIN_FAILURE, payload: {error:"Не правильный логин или пароль"}});
    });
  } else {
    dispatch({type: LOGIN_FAILURE, payload: {error:"Введите ваш логин и пароль"}});
  }
};

export const signup = (data) => dispatch => {
  dispatch({type: SIGNUP_REQUEST});

  return axios.post('/api/signup', data).then(res => {
        localStorage.setItem("auth", JSON.stringify({token_type: res.data.token_type, access_token: res.data.access_token}));
        axios.defaults.headers.common['Authorization'] = res.data.token_type+" "+res.data.access_token;
        dispatch({type: SIGNUP_SUCCESS, payload: res.data});
        window.location.href = '/'
      }).catch(function (error) {
        console.log(error.response)
        dispatch({type: SIGNUP_FAILURE, payload: error.response});
    });
};

export const loadSavedSession = () => dispatch => {
    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

    if(localStorage.getItem('auth')){
      let auth = JSON.parse(localStorage.getItem('auth'));
      let token = auth.token_type+" "+auth.access_token;
      axios.defaults.headers.common['Authorization'] = token;

      axios.get('/api/user').then(res => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token_type: auth.token_type,
              access_token: auth.access_token
            }
          });
        }).catch(function (error) {
          dispatch({ type: LOGIN_FAILURE, payload: {error:null} });
          localStorage.removeItem("auth");
        });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: {error:null} });
    }
}