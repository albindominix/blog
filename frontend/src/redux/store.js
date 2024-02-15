

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi,
  //  userAuthSlice 
  } from './slice/authSlice';
// import { usersApi } from './slice/UsersSlice';
// import authReducer from './authSlice';
import {postsApi} from './slice/postsSlice';

const rootReducer = combineReducers({
    authApi: authApi.reducer,
    // authUser:userAuthSlice.reducer,
    // usersApi:usersApi.reducer,
  postsApi: postsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,postsApi.middleware),
});

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slice/auth'
// export const store =configureStore({
//     reducer:{
//         users:authReducer
//     }
// }) 
