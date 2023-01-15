import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addPost, deletePost, fetchPost, fetchPostsStart, fetchPostsSuccess, fetchPostsFailed, updatePost } from './postSlice';

export const fetchPostsAction = () => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const res = await axios.get('/api/posts');
        const posts = res.data;
        dispatch(fetchPostsSuccess(posts));
    } catch (err) {
        dispatch(fetchPostsFailed(err));
    }
}

export const addPostAction = (post) => async (dispatch) => {
    try {
        const res = await axios.post('/api/posts', post);
        const newPost = res.data;
        dispatch(addPost(newPost));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}

export const deletePostAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch(deletePost(id));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}

export const updatePostAction = (post) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/${post._id}`, post);
        const updatedPost = res.data;
        dispatch(updatePost(updatedPost));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}

export const fetchPostAction = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        const post = res.data;
        dispatch(fetchPost(post));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}
