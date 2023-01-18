//  handle authentication-related tasks such as logging in and out and checking if a user is currently logged in

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser: state => {
            state.loading = true;
        },
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        authError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        }, 
        loginFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        },
        logout: state => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        registerSuccess: (state, action) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = action.payload;
        },
        registerFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        }
    }
    
});

export const { loadUser, userLoaded, authError, loginSuccess, loginFail, logout, registerSuccess, registerFail } = authSlice.actions;
export default authSlice.reducer;

