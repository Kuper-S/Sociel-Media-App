// //  handle authentication-related tasks such as logging in and out and checking if a user is currently logged in

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     isAuthenticated: false,
//     user: null,
//     token: null,
//     loading: false,
//     error: null

// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loadUser: state => {
//             state.loading = true;
//         },
//         userLoaded: (state, action) => {
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.user = action.payload;
//         },
//         authError: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//             state.isAuthenticated = false;
//         },
//         loginSuccess: (state, action) => {
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.user = action.payload;
//         }, 
//         loginFail: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//             state.isAuthenticated = false;
//         },
//         logout: state => {
//             state.isAuthenticated = false;
//             state.loading = false;
//             state.user = null;
//         },
//         registerSuccess: (state, action) => {
//             state.isAuthenticated = false;
//             state.loading = false;
//             state.user = action.payload;
//         },
//         registerFail: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//             state.isAuthenticated = false;
//         }
//     }
    
// });

// export const { loadUser, userLoaded, authError, loginSuccess, loginFail, logout, registerSuccess, registerFail } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
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
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload.user;
        },
        loginFail: state => {
            state.error = 'Invalid Credentials';
            state.loading = false;
        },
        registerSuccess: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload.user;
        },
        registerFail: state => {
            state.error = 'Registration Failed';
            state.loading = false;
        },
        logout: state => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        }
    }
});

export const { loadUser, userLoaded, authError, loginSuccess, loginFail, registerSuccess, registerFail, logout } = authSlice.actions;

export default authSlice.reducer;

