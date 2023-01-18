import { createSlice } from '@reduxjs/toolkit'

const initialState = {
users: [],
loading: false,
error: null
};

const userSlice = createSlice({
name: 'users',
initialState,
reducers: {
fetchUsersStart: state => {
state.loading = true;
},
fetchUsersSuccess: (state, action) => {
state.users = action.payload;
state.loading = false;
},
fetchUsersFailed: (state, action) => {
state.loading = false;
state.error = action.payload;
},
addUser: (state, action) => {
// Check if action.payload is a valid user
if (!action.payload || !action.payload.id || !action.payload.name || !action.payload.email) {
state.error = "Invalid user data";
return;
}


        // Check if the user id is unique
        if (state.users.find(user => user.id === action.payload.id)) {
            state.error = "User id must be unique";
            return;
        }

        // if everything is good we add the user
        state.users = [...state.users, action.payload];
        state.loading = false;
        state.error = null;
    },
    deleteUser: (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
        state.loading = false;
        state.error = null;
    },
    updateUser: (state, action) => {
        state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
        state.loading = false;
        state.error = null;
    },
}
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailed, addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;