import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: state.users.length + 1,
                ...action.payload,
              };
              state.users.push(newUser);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
console.log(action.payload);
            state.users = state.users.map(user =>
                user.id === action.payload.id ? { ...user, ...action.payload } : user
            );
        },
    },
});

export const selectUsers = state => state.user.users
export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
