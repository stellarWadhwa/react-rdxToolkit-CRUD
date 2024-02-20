import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/usersSlice";
import {userloginSlice} from "../features/userloginSlice";



export const reduxStore=configureStore({
    reducer:{
        user: userSlice.reducer,
        userlogin:userloginSlice.reducer
    }
})
