import React from 'react'

function ProfilePosts() {
  return (
    <div className="w-full  flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
      <img src="" alt="" className="" />
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%] ">
      <h1 className="text-xl font-bold md:mb-2  mb-1 md:text-2x1">
        10 Uses of Artificial Intelligence in Day to Day Life
      </h1>

      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between  md:mb-4">
        <p>@snehasishdev</p>
        <div className="flex space-x-2">
          <p>16/0/2032</p>
          <p>16"\:45</p>
        </div>
      </div>
      <p className="text-sm md:text-lg"> promintenexa,pe of ai softeaer ysed in ecevesdta life include voice assisntants image</p>
    </div>
  </div>
  )
}

export default ProfilePosts
