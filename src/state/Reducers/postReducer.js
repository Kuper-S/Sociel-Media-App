import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    posts: [
        {
            "_id": "63c11f75d13602547dc332ea",
            "title": "Niche Perfume",
            "content": "test test",
            "comments": [],
            "likes": [],

        }
    ],
    loading: false,
    error: null
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsStart: state => {
            state.loading = true;
        },
        fetchPost: (state, action) => {
            state.items = {...state.items, ...action.payload};
            state.loading = false;
        },
        fetchPostsSuccess: (state, action) => {
            state.items = {...state.items, ...action.payload};
            state.loading = false;
        },
        fetchPostsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addPost: (state, action) => {
            
            // Check if action.payload is a valid post
            if (!action.payload || !action.payload._id || !action.payload.title || !action.payload.content) {
                state.error = "Invalid post data";
                return;
            }
        
            // Check if the post id is unique
            if (state.items.find(post => post._id === action.payload._id)) {
                state.error = "Post id must be unique";
                return;
            }
        
            // if everything is good we add the post
            state.items = [...state.items, action.payload];
            state.loading = false;
            state.error = null;
        }
        
        ,
        deletePost: (state, action) => {
            state.items = state.items.filter(post => post._id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        updatePost: (state, action) => {
            state.items = state.items.map(post => post._id === action.payload._id ? action.payload : post);
            state.loading = false;
            state.error = null;
        },

    }
});


export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailed , addPost,deletePost,updatePost,fetchPost } = postSlice.actions;

export default postSlice.reducer;
