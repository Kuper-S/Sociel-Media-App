import React from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
// /api/delete/:_id
const Post = (props) => {
    const { post, handleDeletePost, handleUpdatePost } = props;
    if(post && post.title && post.content) {
        return (
            <Card>
                
                    <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>
                    <Button onClick={() => handleUpdatePost(post)}>Update</Button>
               
            </Card>
        )
    } else {
        return <div>Loading...</div>
    }
}
export default Post;