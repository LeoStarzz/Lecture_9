import {
  FETCH_MANAGERS_REQUEST,
  FETCH_MANAGERS_SUCCESS,
  FETCH_MANAGERS_FAILED,
  ADD_MANAGER_REQUEST,
  ADD_MANAGER_SUCCESS,
  ADD_MANAGER_FAILED,
  UPDATE_MANAGER,
  REMOVE_MANAGER
} from '../constants/actionTypes';

const initialState = {
  managers: [],
  isFetching: false,
  error: ''
};

export default function managersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MANAGER_REQUEST:
      return {
        ...state,
        error: ''
      };

    case ADD_MANAGER_SUCCESS:
      return {
        ...state,
        managers: [...state.managers, action.payload],
        error: ''
      };

    case ADD_MANAGER_FAILED:
      return {
        ...state,
        error: action.payload
      };

      case UPDATE_MANAGER:
      return {
        ...state,
        managers: [...state.managers.map((item) => {
          if (item._id !== action._id) {
            return item
          }

          return {
            ...item,
            ...action.payload
          }
        })]
      };

    case REMOVE_MANAGER:
      return {
        ...state,
        managers: [ ...state.managers.filter((manager) => manager._id !== action.payload) ]
      };

    case FETCH_MANAGERS_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case FETCH_MANAGERS_SUCCESS:
      return { ...state, managers: action.payload, isFetching: false, error: '' }

    case FETCH_MANAGERS_FAILED:
      return { ...state, error: action.payload, isFetching: false }

    default:
      return state
  }
}
