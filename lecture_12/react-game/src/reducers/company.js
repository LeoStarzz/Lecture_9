import {
  CHOOSED_EASY,
  CHOOSED_MEDIUM,
  CHOOSED_HARD,
  PROJECT_COMPLETED,
  GET_SALARY,
  START,
  STOP,
  GET_COMPANY_NAME,
  TICK_GAME,
  ERROR
} from '../constants/actionTypes';

const initialState = {
  isOn: false,
  companyName: '',
  mode: undefined,
  time: 0,
  budget: 0,
  tick: 1000,
  error: ''
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case TICK_GAME:
      return { ...state, time: state.time + 1 };

    case ERROR:
      return { ...state, error: action.payload };

    case GET_COMPANY_NAME:
      return { ...state, companyName: action.payload };

    case START:
      return { ...state, isOn: action.payload };

    case STOP:
      return { ...state, isOn: action.payload };

    case PROJECT_COMPLETED:
      return { ...state, budget: state.budget + action.payload };

    case GET_SALARY:
      return { ...state, budget: state.budget - action.payload };

    case CHOOSED_EASY:
      return {
        ...state,
        mode: action.payload.mode,
        budget: action.payload.budget,
        tick: action.payload.tick
      };

    case CHOOSED_MEDIUM:
      return {
        ...state,
        mode: action.payload.mode,
        budget: action.payload.budget,
        tick: action.payload.tick
      };

    case CHOOSED_HARD:
      return {
        ...state,
        mode: action.payload.mode,
        budget: action.payload.budget,
        tick: action.payload.tick
      };

    default:
      return state;
  }
}