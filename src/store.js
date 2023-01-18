import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, compose} from 'redux';
import rootReducer from './state/Reducers/rootReducer';
import thunk from 'redux-thunk'
// define your initial state object. This will contain the initial values for the different properties in your store.
const initialState = {
    posts: {
      items: [
        {},
      ],
      loading: false,
      error: null
    },
    users: {
      currentUser: null,
      
      items: [],
      loading: false,
      error: null
    },
    // comments: {
    //   items: [],
    //   loading: false,
    //   error: null
    // },
    // likes: {
    //   items: [],
    //   loading: false,
    //   error: null
    // },
    // tags: {
    //   items: [],
    //   loading: false,
    //   error: null
    // },
    // perfumes: {
    //   items: [],
    //   loading: false,
    //   error: null
    // },
    auth: {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    },
    // errors: {
    //   message: null
    // }
  };


const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [
        thunk
    ],
 // 
    enhancers: [] //
});

export default store;



