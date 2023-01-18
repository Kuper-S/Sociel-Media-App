import axios from 'axios';

import { addPost,
     deletePost,
      fetchPost,
       fetchPostsStart,
        fetchPostsSuccess,
         fetchPostsFailed,
          updatePost } from '../Reducers/postReducer';

export const fetchPostsAction = () => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const res = await axios.get('posts/api/posts');
        const posts = res.data;
        posts.sort((a, b) => b.createdAt - a.createdAt);


        console.log(posts);
        
        dispatch(fetchPostsSuccess(posts));
    } catch (err) {
        dispatch(fetchPostsFailed(err));
    }
}




export const addPostAction = (post) => async (dispatch) => {
    try {
        const res = await axios.post(`/posts/api/newpost/${post.id}`, post);
        if (!res.data.post) {
            console.log(res.data);
            throw new Error(res.data.message);
        }
        const newPost = res.data.post;
        console.log(newPost._id);
        dispatch(addPost(newPost));
        // return newPost._id;
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}



export const deletePostAction = (id) => async (dispatch) => {
    try {
        // Check if post exists in the database
        const res = await axios.delete(`/posts/api/${id}`);
        const newPost = res.data;
        if (!newPost) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
        }
        // Delete post if it exists
        await axios.delete(`/posts/api/delete/${newPost.id}`);
        console.log('deleted' + newPost.id);
        dispatch(deletePost(newPost.id));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}



export const updatePostAction = (post) => async (dispatch) => {
    try {
        const res = await axios.put(`/posts/api/update/${post._id}`, post);
        const updatedPost = res.data;
        dispatch(updatePost(updatedPost));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}

export const fetchPostAction = () => async (dispatch) => {
     try { 
            const res = await axios.get(`/api/getpost/${post.id}`);
            const post = res.data;
            dispatch(fetchPost(post));
        } catch (err) {
            console.log(err);
            dispatch({ type: 'ERROR', error: err });
        }
}

// export const addPostAction = (post) => async (dispatch) => {
//     try {
//         const res = await axios.post(`/posts/api/newpost/${post.id}`, post);
//         const newPost = res.data;
//         const postId = newPost._id;
//         console.log(newPost._id);
//         dispatch(addPost(newPost));
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: 'ERROR', error: err });
//     }
// }




