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
    
  const handleUpdatePost = (post, postId) => {
      dispatch(updatePostAction(post, postId));
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
            
            <Card.Text>{post.perfume}</Card.Text>
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
            <Post post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} />
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







// const Feed = React.memo(() => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts.items);
//   const loading = useSelector((state) => state.posts.loading);
 

//   let postList = [...posts];
//   postList.unshift(newPost)
//   console.log(posts);
//   console.log(typeof posts);
//   // console.log(posts.items)
//   useEffect(() => {
//     dispatch(fetchPostsAction());
//   }, [dispatch]);

//   const handleNewPost = (post) => {
//     // setNewPost(post);
//     dispatch(addPostAction(post));
//     console.log(post);
    
//     dispatch(fetchPostsAction());
//   }

//   const handleDeletePost = (postId) => {
//       dispatch(deletePostAction(postId));
//       dispatch(fetchPostsAction());
//   }

//   const handleUpdatePost = (post, postId) => {
//       dispatch(updatePostAction(post, postId));
//       dispatch(fetchPostsAction());
//   }

//   return (
//     <Container className="my-5">
//       <Row>
//         <Col>
//           <NewPost handleNewPost={handleNewPost} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} />
//           {loading ? (
//             <Spinner animation="border" variant="primary" />
//           ) : (
//             <ListGroup>
//               {postList.map((post, id) => (
//                 <ListGroup.Item key={id}>
//                   <Card>
//                     <Card.Body>
//                       <Card.Title>{post.title}</Card.Title>
//                       <Card.Text>{post.content}</Card.Text>
//                       <Card.Text>{post.perfume}</Card.Text>
//                       <Card.Text>{post.image}</Card.Text>
//                       <Card.Text>{post.author}</Card.Text>
//                       <Card.Text>{post.comments}</Card.Text>
//                       <Card.Text>{post.likes}</Card.Text>
//                       <Card.Text>{post.createdAt}</Card.Text>
//                       <Card.Text>{post.updatedAt}</Card.Text>
//                       <Card.Text className="text-muted">
//                         {moment(post.createdAt).fromNow()} by {post.author}
//                       </Card.Text>
//                       <Button onClick={() => handleDeletePost(post._id)}>Delete</Button>
//                     </Card.Body>
//                   </Card>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Col>
//         <Col className="col-4">
//           {/* <PostList /> */}
//         </Col>
//       </Row>
//     </Container>
//   );
// });





// const areEqual = (prevProps, nextProps) => {
//     return prevProps.users === nextProps.users && prevProps.loading === nextProps.loading && prevProps.error === nextProps.error;
// }

// export default memo(Feed, areEqual)





// const Feed = React.memo(({postId}) => {
//     const dispatch = useDispatch();
//     const posts = useSelector((state) => state.posts.items);
//     const loading = useSelector((state) => state.posts.loading);
//     const [newPost, setNewPost] = useState({});
    

//     // useEffect(() => {
//     //   dispatch(fetchPostAction(postId));
//     //   dispatch(fetchPostsAction(...posts,postId));
      
//     //   console.log(posts);
//     // }, [dispatch, postId]);

//     useEffect(() => {
//       if (postId) {
//           dispatch(fetchPostAction(postId));
//       } else {
//           dispatch(fetchPostsAction());
//       }
//   }, [dispatch, postId]);


//     const handleNewPost = (post) => {
//       setNewPost(post);
//       posts.map((post) => {
//         console.log(post.title,post._id);
//       });
//       dispatch(addPostAction(post));
//     }
    
    // const handleDeletePost = (post) => {
    //   // map over posts and get the id of the post to delete

    //   // const postToDelte = posts.map((post) => {
    //   //   console.log(post.title,post._id);
    //   //   dispatch(deletePostAction(post._id));
    //   // });
    //     dispatch(deletePostAction(post.id));
    //     // postToDelte.splice(postToDelte.indexOf(post), 1);
    // }
    
//     const handleFeatchPost = (postId) => {
//         dispatch(fetchPostAction(postId));

//     }

//     const handleUpdatePost = (post, postId) => {
//         dispatch(updatePostAction(post, postId));

//     }
//     return (
//       <Container className="my-5">

//         <Row>
//           <Col>
//             <NewPost handleNewPost={handleNewPost} />
//             {loading ? (
//           <Spinner animation="border" variant="primary" />
//         ) : (
//           <ListGroup >
//             {[newPost, ...posts].map((post,id) => (
            
//                 <ListGroup.Item key={id}>
//                 <Card>
//                   <Card.Body>
                    
//                     <Card.Title>{post.title}</Card.Title>
//                     <Card.Text>{post.content}</Card.Text>
//                     <Card.Text>{post.perfume}</Card.Text>
//                     <Card.Text>{post.image}</Card.Text>
//                     <Card.Text>{post.author}</Card.Text>
//                     <Card.Text>{post.comments}</Card.Text>
//                     <Card.Text>{post.likes}</Card.Text>
//                     <Card.Text>{post.createdAt}</Card.Text>
//                     <Card.Text>{post.updatedAt}</Card.Text>
//                     <Card.Text className="text-muted">
//                      {moment(post.createdAt).fromNow()} by {postId}
                    
//                     </Card.Text>
//                     <Button onClick={() => handleDeletePost(posts.post.id)}>Delete</Button>
//                     <Post post={newPost} handleDeletePost={() => handleDeletePost(newPost)} handleUpdatePost={handleUpdatePost} />
//                   </Card.Body>
//                 </Card>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//         {/* <Button onClick={() => setSamplePost({title: 'My first post', body: 'This is the body of my post', perfume: 'perfume'})}>Add Sample Post</Button> */}
//       </Col>
//       <Col className="col-4">
//         {/* <PostList /> */}
//       </Col>
//     </Row>
//   </Container>
// );
// });