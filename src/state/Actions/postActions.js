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
        const res = await axios.get('/posts/api/posts');
        const posts = res.data.posts;
        console.log(posts.map((post) => post.id = post._id));
        posts.sort((a, b) => b.createdAt - a.createdAt);
        dispatch(fetchPostsSuccess(posts));
    } catch (err) {
        dispatch(fetchPostsFailed(err.response ? err.response.data.message : err));
    }
}




export const addPostAction = (post) => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const res = await axios.post(`/posts/api/newpost/${post.id}`, post); 
        if (!res.data.post) {
            console.log(res.data);
            throw new Error(res.data.message);
        }
        const newPost = res.data.post;
        console.log(newPost._id);
        newPost.id = newPost._id;
        
        // dispatch(addPost(newPost));
        dispatch(fetchPostsAction());
        // return newPost._id;
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}



export const deletePostAction = (id) => async (dispatch) => {
    try {
        // Check if post exists in the database
        dispatch(fetchPostsStart());
        const res = await axios.get('/posts/api/posts');
        console.log(res.data);
        const data = res.data.posts;
        console.log(data.length);


        const newPost = data;
        if (!newPost) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
        }
        // map post id to _id 
        newPost.id = newPost._id;
        // find the post with the given id and delete it 
        const post = newPost.find((post) => post.id === id);
        // Delete post if it exists
        await axios.delete(`/posts/api/${post._id}`);
        console.log(`'deleted' + ${post._id}`);
        dispatch(deletePost(post._id));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
}

export const handleDeleteAllPostsAction = () => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const res = await axios.get('/posts/api/posts');
        const data = res.data;
        const newPost = data;
        if (!newPost) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
        }
        newPost.id = newPost._id;
        const posts = newPost.map((post) => post._id);
        console.log(posts);
        await axios.delete(`/posts/api/deleteall`);
        dispatch(deletePost(posts));
    } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR', error: err });
    }
};


export const updatePostAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const res = await axios.get('/posts/api/posts');
        const data = res.data.posts;
       
        const newPost = data;
        console.log(newPost[0]._id);
        if (!newPost) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
        }
        const updatedPost = newPost.find((post) => post._id === id);
        // console.log(updatedPost.id, updatedPost._id, updatedPost.title, updatedPost.content);
        if (!updatedPost) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
          }
        await axios.put(`/posts/api/update/${updatedPost._id}`, updatedPost);
        if (!res.data.posts) {
            console.log(res.data);
            throw new Error(res.data.message);
        }
        
       
        // updatedPost.id = updatedPost._id;
        dispatch(updatePost(updatedPost));
        console.log(updatedPost._id);
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




