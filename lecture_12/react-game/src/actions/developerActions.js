import {
  FETCH_DEVELOPERS_REQUEST,
  FETCH_DEVELOPERS_SUCCESS,
  FETCH_DEVELOPERS_FAILED,
  ADD_DEVELOPER_REQUEST,
  ADD_DEVELOPER_SUCCESS,
  ADD_DEVELOPER_FAILED,
  REMOVE_DEVELOPER,
  UPDATE_DEVELOPER,
} from '../constants/actionTypes';

import { create, getData, updateData } from '../api/api';

export const addDeveloper = (developer) => {
  return async dispatch => {
    dispatch({
      type: ADD_DEVELOPER_REQUEST
    });
    await create('developers', developer)
      .then((developer) => {
        dispatch({
          type: ADD_DEVELOPER_SUCCESS,
          payload: developer
        })
      })
      .catch((e) => {
        dispatch({
          type: ADD_DEVELOPER_FAILED,
          payload: e
        });
      });
  };
};

export const fetchDevelopers = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_DEVELOPERS_REQUEST
    });
      await getData('developers')
      .then((developers) => {
        dispatch({
        type: FETCH_DEVELOPERS_SUCCESS,
        payload: developers
      });
    })
    .catch ((e) => {
      dispatch({
        type: FETCH_DEVELOPERS_FAILED,
        payload: e
      });
    });
  };
};

export const removeDeveloper = (id) => dispatch => {
  dispatch({
    type: REMOVE_DEVELOPER,
    payload: id
  });
};

export const updateDeveloper = (developer) => async dispatch => {
  const updatedDeveloper = await updateData('developers', developer._id, developer);
  dispatch({
    type: UPDATE_DEVELOPER,
    payload: updatedDeveloper
  });
};
