import React, { useState, useEffect , memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Spinner ,Button} from 'react-bootstrap';
import { addPostAction,deletePostAction,updatePostAction ,fetchPostsAction,fetchPostAction,handleDeleteAllPostsAction} from '../../state/Actions/postActions';
import moment from 'moment';
import NewPost from '../NewPost/NewPost';
import './Feed.css';
import Post from '../Post/Post';

const Feed = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.items);
  const loading = useSelector((state) => state.posts.loading);
  const [newPost, setNewPost] = useState({});
  
 
  // useEffect(() => {
  //   dispatch(fetchPostsAction());
  // }, [dispatch]);

  const handleNewPost = (post) => {
    
    setNewPost(post);
    dispatch(addPostAction(post));
    dispatch(fetchPostsAction());
  }


  const handleDeletePost = (post) => {
      dispatch(deletePostAction(post));
      dispatch(fetchPostsAction());
  }
  // /posts/api/update/${post._id}
  const handleUpdatePost = (post) => {
    const postToUpdate = { ...post };
    navigate(`/edit/${postToUpdate._id}`);

    if (!post) return;
    dispatch(updatePostAction(post._id, postToUpdate, navigate));
  };

useEffect(() => {
  dispatch(fetchPostsAction());
}, [dispatch]);

  if (loading) {
    return <div><Spinner animation="grow" variant="warning" /></div>;
  }

  return (
    <div className="feed">
      <NewPost handleNewPost={handleNewPost} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} />

      <ListGroup>
        {posts.map((post, id) => (
          <ListGroup.Item key={id}>
          <Card>
            <Post post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}  />
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
});


const areEqual = (prevProps, nextProps) => {
  return prevProps.users === nextProps.users && prevProps.loading === nextProps.loading && prevProps.error === nextProps.error;
}

export default memo(Feed, areEqual)
