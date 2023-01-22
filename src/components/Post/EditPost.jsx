import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePostAction } from '../../store/actions/postActions';
import * as Yup from 'yup';
const EditPost = (props) => {
    const { post } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        title: post.title,
        content: post.content,
        perfume: post.perfume,
        image: post.image
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Title must be at least 3 characters')
            .required('Title is required'),
        content: Yup.string()
            .min(10, 'Content must be at least 10 characters')
            .required('Content is required'),
        perfume: Yup.string()
            .required('Perfume is required'),
        image: Yup.string()
            .url('Image must be a valid URL')
            .required('Image is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Dispatch the action to update the post here
        updatePostAction( post._id, values, dispatch, navigate)
        
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
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default EditPost;