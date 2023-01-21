// //  handle authentication-related tasks such as logging in and out and checking if a user is currently logged in

// import axios from 'axios';
// import {
//     loadUser,
//     userLoaded,
//     authError,
//     loginSuccess,
//     loginFail,
//     logout,
//     registerSuccess,
//     registerFail 
// } from '../Reducers/authReducer';

// import {USER_LOADING
//     , USER_LOADED
//     , AUTH_ERROR
//     , LOGIN_SUCCESS
//     , LOGIN_FAIL
//     , LOGOUT_SUCCESS
//     , REGISTER_SUCCESS
//     , REGISTER_FAIL
// } from '../Reducers/types';


// export const loadUser = () => (dispatch, getState) => {
//     // User loading
//     dispatch({ type: USER_LOADING });

//     axios.get('/api/auth/user', tokenConfig(getState))
//         .then(res => dispatch({
//             type: USER_LOADED,
//             payload: res.data
//         }))
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status));
//             dispatch({
//                 type: AUTH_ERROR
//             });
//         });
// };

// export const register = ({ username, email, password }) => dispatch => {
//     // Headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
        
//     };

//     // Request body
//     const body = JSON.stringify({ username, email, password });

//     axios.post('/api/auth/register', body, config)
//         .then(res => dispatch({
//             type: REGISTER_SUCCESS,
//             payload: res.data
//         }))
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
//             dispatch({
//                 type: REGISTER_FAIL
//             });
//         });
// }

// export const login = ({ username, password }) => dispatch => {
//     // Headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     // Request body
//     const body = JSON.stringify({ username, password });

//     axios.post('/api/auth/login', body, config)
//         .then(res => dispatch({
//             type: LOGIN_SUCCESS,
//             payload: res.data
//         }))
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
//             dispatch({
//                 type: LOGIN_FAIL
//             });
//         });
// };

// export const logout = () => {
//     return {
//         type: LOGOUT_SUCCESS
//     };
// };

// export const tokenConfig = getState => {
//     // Get token from localstorage
//     const token = getState().auth.token;

//     // Headers
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     };

//     // If token, add to headers
//     if (token) {
//         config.headers['x-auth-token'] = token;
//     }

//     return config;
// }

// router.post('/api/signup', 
//     celebrate({
//         body: Joi.object().keys({
//             username: Joi.string().required(),
//             email: Joi.string().email().required(),
//             password: Joi.string().required()
//         })
//     }), 
//     signup
// );
// // router.post('/api/login/:_userId', login);
// router.post('/api/login', [
//     check('email').isEmail(),
//     check('password').isLength({ min: 6 })
// ], login);
// router.get('/api/logout', logout);
// router.get('/api/:_email', checkToken, getCurrentUser);

// module.exports = router;





import axios from 'axios';
import { loadUser, userLoaded, authError, loginSuccess, loginFail, logout, registerSuccess, registerFail } from '../Reducers/authReducer';

export const loadUserAction = () => (dispatch, getState) => {
    // User loading
   dispatch(loginSuccess());

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => 
            dispatch(userLoaded(res.data))
        )
        .catch(err => {
            dispatch(authError(err));
        });
};

export const registerAction = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // Request body
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(registerSuccess(res.data));
        })
        .catch(err => {
            dispatch(registerFail(err.response.data.msg));
        });
};

export const loginAction = ({ username, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // Request body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch(loginSuccess(res.data));
        })
        .catch(err => {
            dispatch(loginFail(err.response.data.msg));

        });
};

export const logoutAction = () => dispatch => {
    dispatch(logout());
};

export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;

};

