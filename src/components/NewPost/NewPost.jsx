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
    // const title = useSelector((state) => state.posts.title);
    // const content = useSelector((state) => state.posts.content);
    const postId = useSelector((state) => state.posts.postId);
    const image = useSelector((state) => state.posts.image);
    const author = useSelector((state) => state.posts.author);
    const comments = useSelector((state) => state.posts.comments);
    const likes = useSelector((state) => state.posts.likes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            title: title,
            content,
            perfume,
            image,
            author,
            comments,
            likes,
            user,
            createdAt: new Date().toISOString()

    
        };
            
    
        console.log(post);
        const newPost = await handleNewPost(post);
        
        
        // call fetchPostsAction to update the list of posts in the state
        dispatch(fetchPostsAction());
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         title,
    //         content,
    //         perfume,
    //         image,
    //         author,
    //         comments,
    //         likes

    //     };
    
    //             console.log(newPost);
            
    //             const {data} = await handleNewPost(newPost);
    //             newPost._id = data.post._id;
    //             newPost.user = data.post.user;
    //             newPost.image = data.post.image;
    //             newPost.author = data.post.author;
    //             newPost.comments = data.post.comments;
    //             newPost.likes = data.post.likes;
    //             // call fetchPostsAction to update the list of posts in the state
            
    // };


    return (
        <div className='new-post'>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <title>{user} </title>
        </div>
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