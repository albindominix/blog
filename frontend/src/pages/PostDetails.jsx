import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Loader from '../components/Loader'
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import {
  useAddCommentMutation,
  useDeletePostMutation,
  useGetPostCommentsQuery,
  useGetPostsQuery,
  useGetSinglePostQuery,
} from "../redux/slice/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function PostDetails() {
  const [commen, setCommen] = useState([]);
  const [comment, setComment] = useState("");
  const [post1, setPost1] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const postId = useParams().id;
  console.log(postId);
  const { data: post } = useGetSinglePostQuery(postId);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const { data: comments,refetch } = useGetPostCommentsQuery(postId);
  const [addComment] = useAddCommentMutation();

console.log()
  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post?.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => deletePost(postId)}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post?.username}</p>
            <div className="flex space-x-2">
              <p>sbsbdsbfs</p>
              <p>sbsbdsbfs</p>
            </div>
          </div>
          <img src="" className="w-full  mx-auto mt-8" alt="" />
          <p className="mx-auto mt-8">{post?.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post &&
                post.categories?.map((c, i) => (
                  <>
                    <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                      {c}
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((item, index) => (
              <Comment comment={item} refetchComm={refetch}/>
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={async() => {
               await addComment({
                  comment: comment,
                  author: user.username,
                  postId: postId,
                  userId: user._id,
                });
               await refetch() // this is used so that we dont have to reload entire component to get the comments
                // window.location.reload(true); // <== no need for this
              }}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostDetails;
