import {
  FETCH_DEVELOPERS_REQUEST,
  FETCH_DEVELOPERS_SUCCESS,
  FETCH_DEVELOPERS_FAILED,
  ADD_DEVELOPER_REQUEST,
  ADD_DEVELOPER_SUCCESS,
  ADD_DEVELOPER_FAILED,
  UPDATE_DEVELOPER,
  REMOVE_DEVELOPER
} from '../constants/actionTypes';

const initialState = {
  developers: [],
  isFetching: false,
  error: ''
};

export default function developersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DEVELOPER_REQUEST:
      return {
        ...state,
        error: ''
      };

    case ADD_DEVELOPER_SUCCESS:
      return {
        ...state,
        developers: [...state.developers, action.payload],
        error: ''
      };

    case ADD_DEVELOPER_FAILED:
      return {
        ...state,
        error: action.payload
      };

      case UPDATE_DEVELOPER:
      return {
        ...state,
        developers: [...state.developers.map((item) => {
          if (item._id !== action._id) {
            return item
          }

          return {
            ...item,
            ...action.payload
          }
        })]
      };

    case REMOVE_DEVELOPER:
      return {
        ...state,
        developers: [ ...state.developers.filter((developer) => developer._id !== action.payload) ]
      };

    case FETCH_DEVELOPERS_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case FETCH_DEVELOPERS_SUCCESS:
      return { ...state, developers: action.payload, isFetching: false, error: '' }

    case FETCH_DEVELOPERS_FAILED:
      return { ...state, error: action.payload, isFetching: false }

    default:
      return state
  }
}
