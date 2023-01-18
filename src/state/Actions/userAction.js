import {FETCH_USERS,
     ADD_USER,
      DELETE_USER, 
      UPDATE_USER, 
      FETCH_USER, 
      FETCH_USER_BY_EMAIL, 
      FETCH_USER_BY_USERNAME, 
      FETCH_USER_BY_POST, 
      FETCH_USER_BY_LIKE, 
      FETCH_USER_BY_COMMENT, 
      FETCH_USER_BY_DATE, 
      FETCH_USER_BY_SEARCH,
      FETCH_USER_FAILED,
      FETCH_USER_BY_ID,
      FETCH_USERS_FAILED
    } from './constants';
    import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailed, fetchUserById } from './userSlice';
import axios from 'axios';





export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch(fetchUsersStart());
        const res = await axios.get('https://localhost5000/users/api/users');
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
    } catch (err) {
        console.log(err);
        dispatch(fetchUsersFailed(err));
    }
};

    export const fetchUser = (id) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/${id}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }




    export const fetchUserByEmail = (email) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/email/${email}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_EMAIL,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }
    
    export const fetchUserByUsername = (username) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/username/${username}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_USERNAME,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserByPost = (id) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/post/${id}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_POST,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserByLike = (id) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/like/${id}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_LIKE,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserByComment = (id) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/comment/${id}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_COMMENT,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserByDate = (date) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/date/${date}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_DATE,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserBySearch = (search) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/search/${search}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_SEARCH,
                payload: user
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserByIdAction = (id) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/${id}`);
            const user = await res.json();
            dispatch({
                type: FETCH_USER_BY_ID,
                payload: user
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }





    export const addUser = (user) => async (dispatch) => {
        try {
            const res = await axios.get('users/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const newUser = await res.json();
            dispatch({
                type: ADD_USER,
                payload: newUser
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const updateUser = (user) => async (dispatch) => {
        try {
            const res = await axios.get(`users/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const updatedUser = await res.json();
            dispatch({
                type: UPDATE_USER,
                payload: updatedUser
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    // router.post('/api/user', createUser);
    // router.get('/api/users', getUsers);
    // router.get('/api/users/:user_id', getUser);
    // router.patch('/api/users/:user_id', updateUser);
    // router.delete('/api/delete/:user_id',checkAuth, deleteUser);

    export const deleteUser = (id) => async (dispatch) => {
        try {
            await axios.get(`users/api/delete/:${id}`, {
                method: 'DELETE'
            });
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: FETCH_USER_FAILED,
                payload: err
            });
        }
    }

    export const fetchUserFailed = (err) => {
        return {
            type: FETCH_USER_FAILED,
            payload: err,
        }
    };
