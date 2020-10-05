import axios from 'axios';
import {
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  EDIT_REQUEST,
  EDIT_FAILURE,
  EDIT_SUCCESS,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from '../Constants/ToDo';

  export const getToDo = (id) => dispatch => {
    dispatch({type: GET_REQUEST});
    return axios.get(`/api/todo/`+id)
    .then(res => {
          dispatch({
            type: GET_SUCCESS, 
            data: res.data
          });
          return res;
        }).catch(function (error) {
          if(error.response && error.response.data)
            dispatch({type: GET_FAILURE, error: error.response.data});
          if(error.request.status === 401){
            localStorage.removeItem("user");
            window.location.href = '/login'
          }
          return error.response;
      });
  };

export const getToDoList = (filter =  {findText: null, done: null}) => dispatch => {
  dispatch({type: GET_LIST_REQUEST});
  axios.get(`/api/todo`, {
    params: {
      findText: filter.findText,
      done: filter.done,
    }
  }).then(res => {
        dispatch({
          type: GET_LIST_SUCCESS, 
          data: res.data
        });
      }).catch(function (error) {
        if(error.request.status === 401){
          localStorage.removeItem("user");
          window.location.href = '/login'
        }
        dispatch({type: GET_LIST_FAILURE});
    });
};

export const addToDo = (data) => dispatch => {
  dispatch({type: ADD_REQUEST});
  axios.post('/api/todo', data)
      .then(res => {
        dispatch({type: ADD_SUCCESS, item: res.data});
      }).catch(function (error) {
        if(error.response && error.response.data)
          dispatch({type: ADD_FAILURE, error: error.response.data});
        if(error.response && error.response.status === 401){
          localStorage.removeItem("user");
          window.location.href = '/login'
        }
    });
};

export const deleteToDo = (id) => dispatch => {
  dispatch({ type: DELETE_REQUEST });
  axios.delete('/api/todo/'+id)
      .then(res => {
        dispatch({ type: DELETE_SUCCESS, id: id });
      }).catch(function (error) {
        if(error.request.status === 401){
          localStorage.removeItem("user");
          window.location.href = '/login'
        }
        dispatch({ type: DELETE_FAILURE });
    });
};

export const editToDo = (item) => dispatch => {
  dispatch({type: EDIT_REQUEST});
  return axios.put('/api/todo/'+item.id, item)
      .then(res => {
        dispatch({type: EDIT_SUCCESS, item: item});
        return true
      }).catch(function (error) {
        dispatch({type: EDIT_FAILURE, error: error.response.data});
        if(error.request.status === 401){
          localStorage.removeItem("user");
          window.location.href = '/login'
        }
        
        return false
        //dispatch(addDeviceFailure());
    });
};

export const editToDoDone = (item) => dispatch => {
  dispatch({type: EDIT_REQUEST});
  item.done = !item.done;
  axios.put('/api/todo/'+item.id, item)
      .then(res => {
        dispatch({type: EDIT_SUCCESS, item: item});
        
      }).catch(function (error) {
        dispatch({type: EDIT_FAILURE});
        if(error.request.status === 401){
          localStorage.removeItem("user");
          window.location.href = '/login'
        }
        //dispatch(addDeviceFailure());
    });
};
