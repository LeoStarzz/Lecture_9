import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED,
  UPDATE_PROJECT,
  REMOVE_PROJECT
} from '../constants/actionTypes';

const initialState = {
  projects: [],
  isFetching: false,
  error: ''
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT_REQUEST:
      return {
        ...state,
        error: ''
      };

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        error: ''
      };

    case ADD_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects.map((item) => {
          if (item._id !== action._id) {
            return item
          }

          return {
            ...item,
            ...action.payload
          }
        })]
      };

    case REMOVE_PROJECT:
      return {
        ...state,
        projects: [...state.projects.filter((project) => project._id !== action.payload._id)]
      };

    case FETCH_PROJECTS_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case FETCH_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, isFetching: false, error: '' }

    case FETCH_PROJECTS_FAILED:
      return { ...state, error: action.payload, isFetching: false }

    default:
      return state
  }
}
