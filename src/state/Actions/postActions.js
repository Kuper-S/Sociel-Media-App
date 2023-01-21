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



export const updatePostAction = (id) => async (dispatch) => {
    try {
        
        const post = await axios.get(`/posts/api/${post._id}`);
        if (!post) {
            return dispatch({ type: 'ERROR', error: 'Post not found' });
        }
        

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




