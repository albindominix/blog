// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';

// const URL = import.meta.env.VITE_BACKEND_URL

// // Create an API slice
// export const usersApi = createApi({
//   reducerPath: 'usersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: URL }),
//   endpoints: (builder) => ({
//     getUser: builder.query({
//       query: () => '/users/refetch',
//       credentials: 'include', // to send cookies
//     }),
//   }),
// });

// // Export the auto-generated hooks
// export const { useGetUserQuery } = usersApi;
