import {
  PROJECT_COMPLETED,
  GET_SALARY,
  CHOOSED_EASY,
  CHOOSED_MEDIUM,
  CHOOSED_HARD,
  START,
  STOP,
  GET_COMPANY_NAME,
  TICK_GAME,
  ERROR
} from '../constants/actionTypes';

import { deleteAll } from '../api/api';

export const tickGame = () => dispatch => {
  dispatch({
    type: TICK_GAME
  });
};

export const error = (message) => dispatch => {
  dispatch({
    type: ERROR,
    payload: message
  });
}

export const getCompanyName = (name) => dispatch => {
  dispatch({
    type: GET_COMPANY_NAME,
    payload: name
  });
}

export const projectCompleted = (projectCost) => async dispatch => {
  dispatch({
    type: PROJECT_COMPLETED,
    payload: projectCost
  })
};

export const getSalary = (salary) => dispatch => {
  dispatch({
    type: GET_SALARY,
    payload: salary
  })
};

export const choosedEasy = () => dispatch => {
  dispatch({
    type: CHOOSED_EASY,
    payload: {
      mode: 'easy',
      budget: 1000000,
      tick: 3000
    }
  });
};

export const choosedMedium = () => dispatch => {
  dispatch({
    type: CHOOSED_MEDIUM,
    payload: {
      mode: 'medium',
      budget: 500000,
      tick: 2000
    }
  });
};

export const choosedHard = () => dispatch => {
  dispatch({
    type: CHOOSED_HARD,
    payload: {
      mode: 'hard',
      budget: 250000,
      tick: 1000
    }
  });
};

export const start = () => dispatch => {
  dispatch({
    type: START,
    payload: true
  });
};

export const stop = () => async dispatch => {
  await deleteAll('projects');
  await deleteAll('managers');
  await deleteAll('developers');
  stop();
  dispatch({
    type: STOP,
    payload: false
  });
  window.location.reload();
}