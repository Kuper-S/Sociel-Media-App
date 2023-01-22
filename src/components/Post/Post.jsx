import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
// /api/delete/:_id
const Post = (props) => {
    const { post, handleDeletePost, handleUpdatePost ,handleEditPost } = props;
    let editing = false;
    if(post && post.title && post.content) {
        return (
            <Card>
                    
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text>{post.perfume}</Card.Text>
                    <Card.Text>{post.image}</Card.Text>
                    <Card.Text>{post.author}</Card.Text>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
                    <Card.Text>{post.comments}</Card.Text>
                    <Card.Text>{post.likes}</Card.Text>
                    <Card.Text>{post.createdAt}</Card.Text>
                    <Card.Text>{post.date}</Card.Text>
                    <Card.Text>{post._id}</Card.Text>

                    <Card.Text className="text-muted">
                        {moment(post.createdAt).fromNow()} by {post.author}
                    </Card.Text>
                    <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>
                    <Button onClick={() => handleUpdatePost(post)}>Update</Button>
                    <Button onClick={() => handleEditPost(post)}>Edit</Button>
               
            </Card>
        )
    } else {
        return <div>Loading...</div>
    }
}
export default Post;