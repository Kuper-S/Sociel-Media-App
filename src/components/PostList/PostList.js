import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsAction } from '../../state/Actions/postActions';
import { fetchPostsFailed } from '../../state/Actions/postActions';
import axios from 'axios';
import Post from '../Post/Post';

const PostsList = () => {
    const dispatch = useDispatch();
    // const posts = useSelector((state) => state.posts.posts);
    const posts = useSelector((state) => state.posts.items);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);
  
    useEffect(() => {
      if (!posts && !loading && !error) {
        dispatch(fetchPostsAction());
        
      }
    }, [dispatch, posts, loading, error]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h3>BLA</h3>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
          
        ))}
      </div>
    );
  };




export default PostsList;


