import React, { useState, useEffect , memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, Spinner ,Button} from 'react-bootstrap';
import { addPostAction,deletePostAction,updatePostAction ,fetchPostsAction,fetchPostAction} from '../../state/Actions/postActions';
import moment from 'moment';
import NewPost from '../NewPost/NewPost';
import './Feed.css';
import Post from '../Post/Post';

const Feed = React.memo(() => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.items);
    const postId = useSelector((state) => state.posts.postId);
    const loading = useSelector((state) => state.posts.loading);
    const [newPost, setNewPost] = useState({});
    

    useEffect(() => {
      dispatch(fetchPostsAction());
    }, [dispatch]);
  
    const handleNewPost = (post) => {
      setNewPost(post);
      dispatch(addPostAction(post));
    }
    
    const handleDeletePost = (postId) => {
        console.log(postId);
        dispatch(deletePostAction(postId));
    }
    

    const handleUpdatePost = (post, postId) => {
        dispatch(updatePostAction(post, postId));

    }
    return (
      <Container className="my-5">

        <Row>
          <Col>
            <NewPost handleNewPost={handleNewPost} />
            {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <ListGroup >
            {[newPost, ...posts].map((post,id) => (
            
                <ListGroup.Item key={id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text className="text-muted">
                     {moment(post.createdAt).fromNow()} by {postId}
                    
                    </Card.Text>
                    
                    <Post post={newPost} handleDeletePost={() => handleDeletePost(newPost)} handleUpdatePost={handleUpdatePost} />
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {/* <Button onClick={() => setSamplePost({title: 'My first post', body: 'This is the body of my post', perfume: 'perfume'})}>Add Sample Post</Button> */}
      </Col>
    </Row>
  </Container>
);
});
const areEqual = (prevProps, nextProps) => {
    return prevProps.users === nextProps.users && prevProps.loading === nextProps.loading && prevProps.error === nextProps.error;
}

export default memo(Feed, areEqual)

