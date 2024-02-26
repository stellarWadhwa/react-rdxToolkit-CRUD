import { createSlice } from '@reduxjs/toolkit';

export const userRegisterSlice = createSlice({
    name: 'userregister',
    initialState: {
        user:null,
        isFetching:false,
        error:false
    },
    reducers: {
        registerStart: (state) => {
            console.log('registerStart')
            state.user=null
              state.isFetching = true;
              state.error=false; 
        },
        registerSuccess: (state) => {
              state.user=null;
              state.isFetching = false;
              state.error=false; 
        },
        registerFailure:(state)=>{
            state.user=null;
            state.isFetching = false;
            state.error=true; 
        }
    },
});


export const { registerStart, registerSuccess, registerFailure } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
