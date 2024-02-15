import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/usersSlice";


export const reduxStore=configureStore({
    reducer:{
        user: userSlice.reducer
    }
})
