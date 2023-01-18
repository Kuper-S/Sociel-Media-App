import React, { useState } from 'react';
import { addPostAction,fetchPostsAction ,fetchPostAction} from '../../state/Actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import './NewPost.css';
import { Button, Form } from 'react-bootstrap';




const NewPost = React.memo( ({ post,user,handleNewPost, handleUpdatePost, handleDeletePost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [perfume, setPerfume] = useState('');
    const dispatch = useDispatch();
    const postId = useSelector((state) => state.posts.postId);
    const _id = useSelector((state) => state.posts._id);

    const getPostId = (_id) => {
        dispatch(fetchPostsAction(_id));
        console.log(_id);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
        id: post,
        title,
        content,
        perfume,
        user : _id
        };
        if (postId) {
            handleUpdatePost(newPost, postId);
        } else {
            handleNewPost(newPost);
            getPostId();
        }
        
    };
    
    return (
        <div className='new-post'>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Title: </label>
            <br />
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <br />
            <div>
            <label>Perfume: </label>
            <br />
            <input
                type="text"
                value={perfume}
                onChange={(e) => setPerfume(e.target.value)}
            />
            </div>
            <div>
            <label>Content: </label>
            <br />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </div>
            <br />
            <Button type="submit">Submit</Button>
        </form>
        <Button variant="danger" onClick={handleDeletePost}>Delete Post</Button>
        </div>
    );
});

export default NewPost;