import {
    GET_LIST_REQUEST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILURE,
    ADD_REQUEST,
    ADD_SUCCESS,
    ADD_FAILURE,
    EDIT_SUCCESS,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    GET_SUCCESS, GET_REQUEST, GET_FAILURE, EDIT_FAILURE
  } from '../Constants/ToDo';
  
  export const initialState = {
    current_page: 1,
    current: null,
    list: [],
    total: 0,
    isLoading: false,
    isLoadingItem: false,
    error: null
  };
  
  export default function ToDoReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SUCCESS:
        return {
          ...state,
          current: action.data,
          isLoading: false
        };
      case GET_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case GET_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.data.error
        };
 
      case GET_LIST_SUCCESS:
        return {
          ...state,
          current_page: action.data.current_page,
          list: action.data.data,
          total: action.data.total,
          isLoading: false
        };
      case GET_LIST_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case GET_LIST_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.data.error
        };
        case ADD_REQUEST:
          return {
            ...state,
            isLoadingItem: true
          };
          case ADD_SUCCESS:
            return {
              ...state,
              list: state.list.concat(action.item),
              isLoadingItem: false
            };
      case ADD_FAILURE:
        return {
          ...state,
          error: action.error,
          isLoadingItem: false
        };
        case EDIT_SUCCESS:
          return {
            ...state,
            list: state.list.map( item => (item.id == action.item.id)?action.item:item ),
            isLoading: false
          };
          case EDIT_FAILURE:
          return {
            ...state,
            error: action.error 
            ,
            isLoading: false
          };
      case DELETE_SUCCESS:
        var dev = [];
        state.list.map(item => {
          if (Number(item.id) !== Number(action.id))
            dev.push(item);
        });
        return {
          ...state,
          isLoading: false,
          list: dev,
        };
      default:
        return state;
    }
  }
  