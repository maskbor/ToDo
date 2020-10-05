import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS
} from '../Constants/Auth';



const initialState = {
  isLoading: false,
  isAuthenticated: null,
  name: null,
  email: null,
  token: null,
  token_type: null,
  permissions: null,
  error: {
    message: null,
    list: null
  }
}

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        name: payload.name,
        email: payload.email,
        token: payload.access_token,
        token_type: payload.token_type,
        //permissions: payload.permissions,
        error: {
          message: null,
          list: null
        }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        name: null,
        email: null,
        token: null,
        token_type: null,
        //permissions: null,
        error: {
          ...state.error,
          message: payload.error
        }
      };
    
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        name: payload.name,
        email: payload.email,
        token: payload.access_token,
        token_type: payload.token_type,
        //permissions: payload.permissions,
        error: {
          message: null,
          list: null
        }
      };
    case SIGNUP_FAILURE:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          name: null,
          email: null,
          token: null,
          token_type: null,
          //permissions: null,
          error: {
            message: null, 
            list: payload.data.list
          }
        };
    
        case LOGOUT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            name: null,
            email: null,
            token: null,
            token_type: null,
            //permissions: null,
            error: {
              message: null,
              list: null
            }
          };    
    default:
      return state;
  }
}
