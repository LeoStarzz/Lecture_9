import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED,
  REMOVE_PROJECT,
  UPDATE_PROJECT,
} from '../constants/actionTypes';

import { create, getData, deleteOne, updateData } from '../api/api';

export const addProject = (project) => {
  return async dispatch => {
    dispatch({
      type: ADD_PROJECT_REQUEST
    });
    await create('projects', project)
      .then((project) => {
        dispatch({
          type: ADD_PROJECT_SUCCESS,
          payload: project
        })
      })
      .catch((e) => {
        dispatch({
          type: ADD_PROJECT_FAILED,
          payload: e
        });
      });
  }
};

export const fetchProjects = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PROJECTS_REQUEST
    });
      await getData('projects')
      .then((projects) => {
        dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: projects
      });
    })
    .catch ((e) => {
      dispatch({
        type: FETCH_PROJECTS_FAILED,
        payload: e
      });
    });
  };
};

export const removeProject = (id) => async dispatch => {
  const project = await deleteOne('projects', id);
  dispatch({
    type: REMOVE_PROJECT,
    payload: project
  });
};

export const updateProject = (project) => async dispatch => {
  const updatedProject = await updateData('projects', project._id, project);
  dispatch({
    type: UPDATE_PROJECT,
    payload: updatedProject
  });
};


