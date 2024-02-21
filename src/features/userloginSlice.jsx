import { createSlice } from '@reduxjs/toolkit';

export const userloginSlice = createSlice({
    name: 'userlogin',
    initialState: {
        user:JSON.parse(localStorage.getItem("user"))||null,
        isFetching:false,
        error:false
    },
    reducers: {
        loginStart: (state) => {
            state.user=null
              state.isFetching = true;
              state.error=false; 
        },
        loginSuccess: (state, action) => {
         console.log(action.payload.res.data)
              state.user=action.payload.res.data;
              state.isFetching = false;
              state.error=false; 
        },
        logout: (state) => {
            state.user=null;
            state.isFetching = false;
            state.error=false; 
        },
        loginFailure:(state)=>{
            state.user=null;
            state.isFetching = false;
            state.error=true; 
        }
    },
});

export const selectUserLogin = state => state.userlogin
export const { loginStart, loginSuccess, logout,loginFailure } = userloginSlice.actions;
export default userloginSlice.reducer;
