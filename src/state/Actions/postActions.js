import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
        // To REMOVE
        // console.log(posts.map((post) => post.id = post._id));
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




// export const updatePostAction = (id, values, navigate) => async () => {
//   const dispatch = useDispatch();
//   try {
//     dispatch(fetchPostsStart());
//     const res = await axios.put(`/posts/api/update/${id}`, values);
//     const updatedPost = res.data.post._id;
//     console.log(updatedPost);
//     if (!res.data.posts) {
//       console.log(res.data);
//       throw new Error(res.data.message);
//     }
//     dispatch(updatePost(res.data.post));
//     navigate("/");
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: 'ERROR', error: err });
//   }
// };

// export const updatePostAction = (id, values, navigate) => async () => {
//     const dispatch = useDispatch();
//     try {
//       dispatch(fetchPostsStart());
//       const res = await axios.put(`/posts/api/update/${id}`, values);
//       const updatedPost = res.data.post._id;
//       console.log(updatedPost);
//       if (!res.data.posts) {
//         console.log(res.data);
//         throw new Error(res.data.message);
//       }
//       dispatch(updatePost(updatedPost));
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       dispatch({ type: 'ERROR', error: err });
//     }
//   };
const UpdatePostActionWrapper = async ({ id, values, navigate }) => {
    const dispatch = useDispatch();
    try {
      dispatch(fetchPostsStart());
      const res = await axios.put(`/posts/api/update/${id}`, values);
      const updatedPost = res.data.post._id;
      console.log(updatedPost);
      if (!res.data.posts) {
        console.log(res.data);
        throw new Error(res.data.message);
      }
      dispatch(updatePost(updatedPost));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: 'ERROR', error: err });
    }
  };
  
  export const updatePostAction = (id, values, navigate) => {
    return <UpdatePostActionWrapper id={id} values={values} navigate={navigate} />;
  };
  



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




