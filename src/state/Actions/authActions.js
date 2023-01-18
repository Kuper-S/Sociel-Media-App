//  handle authentication-related tasks such as logging in and out and checking if a user is currently logged in

import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit'
import {
    loadUser,
    userLoaded,
    authError,
    loginSuccess,
    loginFail,
    logout,
    registerSuccess,
    registerFail 
} from '../Reducers/authReducer';

import {USER_LOADING
    , USER_LOADED
    , AUTH_ERROR
    , LOGIN_SUCCESS
    , LOGIN_FAIL
    , LOGOUT_SUCCESS
    , REGISTER_SUCCESS
    , REGISTER_FAIL
} from '../Reducers/types';


export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const register = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}


