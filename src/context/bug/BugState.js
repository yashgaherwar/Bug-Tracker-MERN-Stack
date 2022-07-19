import React, { useReducer } from 'react';
import axios from 'axios';
import BugContext from './bugContext';
import bugReducer from './bugReducer';
import {
  GET_BUGS,
  ADD_BUG,
  DELETE_BUG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BUG,
  FILTER_BUGS,
  CLEAR_BUGS,
  CLEAR_FILTER,
  BUG_ERROR,
} from '../types';
import axiosInstance from '../../components/utils/axiosInstance';

const BugState = (props) => {
  const initialState = {
    bugs: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);

  // Get Bugs
  const getBugs = async () => {
    try {
      const res = await axiosInstance.get('/api/bugs');

      dispatch({ type: GET_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Add Bug
  const addBug = async (bug) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axiosInstance.post('/api/bugs', bug, config);

      dispatch({ type: ADD_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Update Bug
  const updateBug = async (bug) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axiosInstance.put(`/api/bugs/${bug._id}`, bug, config);

      dispatch({ type: UPDATE_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Delete Bug
  const deleteBug = async (id) => {
    try {
      await axiosInstance.delete(`api/bugs/${id}`);

      dispatch({ type: DELETE_BUG, payload: id });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Clear Bugs
  const clearBugs = () => {
    dispatch({ type: CLEAR_BUGS });
  };

  // Set Current Bug
  const setCurrent = (bug) => {
    dispatch({ type: SET_CURRENT, payload: bug });
  };

  // Clear Current Bug
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Bugs
  const filterBugs = (text) => {
    dispatch({ type: FILTER_BUGS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BugContext.Provider
      value={{
        bugs: state.bugs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getBugs,
        addBug,
        deleteBug,
        updateBug,
        setCurrent,
        clearCurrent,
        filterBugs,
        clearFilter,
        clearBugs,
      }}
    >
      {props.children}
    </BugContext.Provider>
  );
};

export default BugState;
