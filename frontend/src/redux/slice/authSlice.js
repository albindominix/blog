import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/auth' , credentials:"include"}),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,

      }),
    }),
    logout: builder.mutation({
        query: (user) => ({
          url: 'logout',
          method: 'POST',
        }),
    }),
    getUser: builder.query({
        query: () => '/users/refetch',
      }),
  }),
});


// export const userAuthSlice = createSlice({
//     name: "user",
//     initialState: {
//       user: null,
//       isLoading: false,
//       error: null,
//     },
//     reducers:{
//         userUpdated: (state, action) => {
//             state.user = action.payload
//           },
//     }
// })

// export const { userUpdated } = userAuthSlice.actions;

export const { useRegisterMutation, useLoginMutation,useLogoutMutation,useGetUserQuery } = authApi;