import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';
import axiosInstance from '../../components/utils/axiosInstance';
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
console.log(state);
  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axiosInstance.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData,props) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      axios.defaults.baseURL = "http://localhost:5000/"
      const body=JSON.stringify(formData);
      const res = await axiosInstance.post('/api/users', body, config);
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      props.history.push("/login")

      // loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      axios.defaults.baseURL = "http://localhost:5000/"
      const res = await axiosInstance.post('/api/auth', formData, config);
      localStorage.setItem("token",res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERRORS,
    });
  console.log(state?.token);
  return (
    <AuthContext.Provider
      value={{
        token: state?.token,
        isAuthenticated: state?.isAuthenticated,
        loading: state?.loading,
        user: state?.user,
        error: state?.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
