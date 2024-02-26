import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/usersSlice";
import {userloginSlice} from "../features/userloginSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import { userRegisterSlice } from "../features/userlRegisterSlice";

const persistConfig={
    key:'root',
    version:1,
    storage
};
const reducer=combineReducers({
    user: userSlice.reducer,
    userlogin:userloginSlice.reducer,
    userregister:userRegisterSlice.reducer
})

const persistedReducer=persistReducer(persistConfig,reducer);

export const reduxStore=configureStore({
    reducer:persistedReducer
})
