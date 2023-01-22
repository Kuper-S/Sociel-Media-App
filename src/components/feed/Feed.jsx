import React, { useState, useEffect , memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, Spinner ,Button} from 'react-bootstrap';
import { addPostAction,deletePostAction,updatePostAction ,fetchPostsAction,fetchPostAction,handleDeleteAllPostsAction} from '../../state/Actions/postActions';
import moment from 'moment';
import NewPost from '../NewPost/NewPost';
import './Feed.css';
import Post from '../Post/Post';

const Feed = React.memo(() => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const loading = useSelector((state) => state.posts.loading);
  const [newPost, setNewPost] = useState({});
  
  // console.log(posts);
  // console.log(typeof posts);
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  const handleNewPost = (post) => {
    
    setNewPost(post);
    dispatch(addPostAction(post));
    dispatch(fetchPostsAction());
  }


  const handleDeletePost = (post) => {
      dispatch(deletePostAction(post.id));
      dispatch(fetchPostsAction());
  }
    
  const handleDeleteAllPosts = () => {
    dispatch(handleDeleteAllPostsAction());
    dispatch(fetchPostsAction());
  };
  const handleUpdatePost = (post) => {
    const { title, content, perfume, image, author, date, comments, likes, createdAt } = post;
    const postToUpdate = { title: title, content: content, perfume: perfume, image: image, author: author, date: date, comments: comments, likes: likes, createdAt: createdAt };

    console.log(post);
    dispatch(updatePostAction(post.id, post));
    dispatch(fetchPostsAction());
}


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
          <Card.Title>{post.title} BY : {post.author}</Card.Title>
            
            {/* <Card.Text>{post.perfume}</Card.Text>
            <Card.Text>{post.content}</Card.Text>
            <Card.Text>{post.image}</Card.Text>
            <Card.Text>{post.author}</Card.Text>
            <Card.Text>{post.content}</Card.Text>
            <Card.Text>{post.date}</Card.Text>
            <Card.Text>{post.comments}</Card.Text>
            <Card.Text className="text-muted">
                      {moment(post.createdAt).fromNow()} by {post._id}
                    
                    </Card.Text>
            <Card.Text>{post.likes}</Card.Text>
            <Card.Text>{post.createdAt}</Card.Text> */}
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
