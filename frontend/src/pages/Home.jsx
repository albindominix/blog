import React, { useEffect ,useState} from "react";
import HomePosts from "../components/HomePosts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom"

// import { useGetUserQuery, userUpdated } from "../redux/slice/authSlice";
// import { useDispatch, useSelector } from "react-redux";
import { useGetPostsQuery } from "../redux/slice/postsSlice";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery, 
  // userUpdated 
} from "../redux/slice/authSlice";

function Home() {


  
  const { data:getUserData,isLoading:loading } = useGetUserQuery();
  const { data, isLoading, error } = useGetPostsQuery(); 
  // const { user } = useSelector((state) => state.authUser); 
  const user = JSON.parse(localStorage.getItem("user"));

  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userUpdated(getUserData));
  // }, [getUserData]);

    // console.log(user,'home')
    
  useEffect(() => {
    if(isLoading) {
      setNoResults(false);
    }

    if(data?.length === 0) {
      setNoResults(true);
    }``
  }, [data, isLoading])


  if(isLoading)  {
    return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'80vh'}}><Loader /></div>)
  }

  if(error) {
   return (
    <div>error message</div>
   )
  }

  if(noResults) {
    return (
      <div>no results</div>
    )
  }


  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[280px]">
        {
          data?.map((item,index)=>(
            <Link to={user?`/posts/post/${item._id}`:"/login"}>
            <HomePosts key={item?._id} post={item}/>
            </Link>

          ))
        }
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
