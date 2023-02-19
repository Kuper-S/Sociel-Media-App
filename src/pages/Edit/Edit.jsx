import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updatePostAction } from '../../state/Actions/postActions';

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const post = useSelector((state) => state.posts.items.find((post) => post._id === id));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [post]);

    if (!post) {
        return <div>Post not found</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const initialValues = {
        name: post.name,
        title: post.title,
        content: post.content,
        perfume: post.perfume,
        image: post.image
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        title: Yup.string()
            .min(3, 'Title must be at least 3 characters')
            .required('Title is required'),
        content: Yup.string().required('Content must be at least 3 characters'),
        perfume: Yup.string().required('Perfume is required'),
        image: Yup.string().required('Image is required'),
    });
    
    // const handleSubmit = (values, { setSubmitting, resetForm }) => {
    //     // Dispatch the action to update the post here
    //     dispatch(updatePostAction(post._id, values));
    //     navigate(`/post/${post._id}`);
    //     setSubmitting(false);
    //     resetForm();
    // };
   const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(updatePostAction(post._id, values, navigate));
    console.log("handleSubmit" + post._id , values);
    setTimeout(() => {
      navigate(`/`);
    }, 1000);
    console.log("handleSubmit" + post._id , values);
    setSubmitting(false);
    resetForm();
};


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <Field type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <Field type="text" name="title" placeholder="Title" />
                        <ErrorMessage name="title" component="div" />
                    </div>
                    <div>
                        <Field type="text" name="content" placeholder="Content" />
                        <ErrorMessage name="content" component="div" />
                    </div>
                    <div>
                        <Field type="text" name="perfume" placeholder="Perfume" />
                        <ErrorMessage name="perfume" component="div" />
                    </div>
                    <div>
                        <Field type="text" name="image" placeholder="Image" />
                        <ErrorMessage name="image" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default Edit;