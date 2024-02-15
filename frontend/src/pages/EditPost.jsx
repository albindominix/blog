import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPostMutation, useGetSinglePostQuery } from "../redux/slice/postsSlice";
import Footer from "../components/Footer";
import axios from "axios";
function EditPost() {
  const postId=useParams().id
  
  const user = localStorage.getItem('user')
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])

const [editPost,{data:postData}] = useEditPostMutation()
  const {data}= useGetSinglePostQuery(postId,{ skip: !postId })

  useEffect(()=>{
    setTitle(data.title)
    setDesc(data.desc)
    setFile(data.photo)
    setCats(data.categories)
  },[data])

  function deleteCategory(i) {
    let updatedCats = [...cats];
    updatedCats.splice(i,1);
    setCats(updatedCats);
  }

  function addCategory() {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  }

  const handleUpdate=async (e)=>{
    e.preventDefault()
    const post={
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }
    try{
      // editPost(postId,post).then(res=>{navigate("/posts/post/"+res._id);console.log(res)})
      const res=await axios.put("http://localhost:8000/posts/"+postId,post,{withCredentials:true})
      console.log("🚀 ~ file: EditPost.jsx:55 ~ handleUpdate ~ res:", res)
      navigate("/posts/post/"+res.data._id);
      location.reload(true)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
    <Navbar/>
    <div className='px-6 md:px-[200px] mt-8'>
    <h1 className='font-bold md:text-2xl text-xl '>Update a post</h1>
    <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
      <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/>
      {/* <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/> */}
      <div className='flex flex-col'>
        <div className='flex items-center space-x-4 md:space-x-8'>
            <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
        </div>

        {/* categories */}
        <div className='flex px-4 mt-3'>
        {cats?.map((c,i)=>(
            <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
            <p>{c}</p>
            <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
        </div>
        ))}
        
        
        </div>
      </div>
      <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/>
      <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
    </form>

    </div>
    <Footer/>
</div>
  )
}


  export default EditPost