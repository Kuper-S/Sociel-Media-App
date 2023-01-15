import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import { fetchPosts } from '../actions/postActions';
import moment from 'moment';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <ListGroup>
              {posts.map((post) => (
                <ListGroup.Item key={post._id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body}</Card.Text>
                      <Card.Text className="text-muted">
                        {moment(post.createdAt).fromNow()} by {post.author.username}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
