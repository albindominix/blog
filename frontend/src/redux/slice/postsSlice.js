import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = import.meta.env.VITE_BACKEND_URL

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL , credentials:"include"}),
  endpoints: (builder) => ({
    getSinglePost: builder.query({
      query: (postId) => `posts/${postId}`,
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: `/posts/create`, 
        method: 'POST',
        body:post
      })
    }),
 
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`, 
        method: 'DELETE'
      })
    }),
    getPostComments: builder.query({
     query: (postId) => `/comments/post/${postId}`,
    }) ,
    addComment: builder.mutation({
      query: (initialComment) => ({
        url: '/comments/create',
        method: 'POST',
        body: initialComment
      })
    }),
    deleteComment:builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      })
    }),
    getPosts: builder.query({
        query: () => 'posts',
      }),
      getBlogs:builder.query({
        query:(userId)=>`posts/user/${userId}`
      })
  }),
});



export const {
  useAddCommentMutation,
  useDeletePostMutation,
  useGetPostCommentsQuery,
  useGetSinglePostQuery,
  useEditPostMutation,
  useGetPostsQuery,
  useDeleteCommentMutation,
useCreatePostMutation ,
useGetBlogsQuery} = postsApi; 