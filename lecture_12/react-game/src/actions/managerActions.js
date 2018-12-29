import {
  FETCH_MANAGERS_REQUEST,
  FETCH_MANAGERS_SUCCESS,
  FETCH_MANAGERS_FAILED,
  ADD_MANAGER_REQUEST,
  ADD_MANAGER_SUCCESS,
  ADD_MANAGER_FAILED,
  REMOVE_MANAGER,
  UPDATE_MANAGER,
} from '../constants/actionTypes';

import { create, getData, updateData } from '../api/api';

export const addManager= (manager) => {
  return async dispatch => {
    dispatch({
      type: ADD_MANAGER_REQUEST
    });
    console.log(manager);
    await create('managers', manager)
      .then((manager) => {
        dispatch({
          type: ADD_MANAGER_SUCCESS,
          payload: manager
        })
      })
      .catch((e) => {
        dispatch({
          type: ADD_MANAGER_FAILED,
          payload: e
        });
      });
  }
};


export const fetchManagers = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_MANAGERS_REQUEST
    });
    
     await getData('managers')
      .then((managers) => {
        dispatch({
        type: FETCH_MANAGERS_SUCCESS,
        payload: managers
      });
    })
    .catch ((e) => {
      dispatch({
        type: FETCH_MANAGERS_FAILED
      });
    });
  };
};

export const removeManager = (id) => dispatch => {
  dispatch({
    type: REMOVE_MANAGER,
    payload: id
  });
};

export const updateManager = (manager) => async dispatch => {
  const updatedManager = await updateData('managers', manager._id, manager);
  dispatch({
    type: UPDATE_MANAGER,
    payload: updatedManager
  });
};
