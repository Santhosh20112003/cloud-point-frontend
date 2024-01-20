import { useState } from "react";
import { Link } from "react-router-dom";
import { profilepic } from "../../common/links";
import { useUserAuth } from "../context/UserAuthContext";

const FreeCard = () => {
	const { user,logOut } = useUserAuth();
  const username = user?.email?.split("@")[0].replace(/[^a-zA-Z]/g, "") || "";
	return (

		<div className="absolute bottom-4 left-2 flex w-[230px] mt-8  h-fit justify-center items-center">
		  {user ? <div className="bg-gradient-to-b from-blue-200 to-blue-400 w-full flex  items-center justify-start flex-col shadow-lg mt-8 rounded-3xl">
		  <div className=" bg-blue-500 h-16 -top-8 w-16 rounded-full flex items-center justify-center border-4 border-blue-200 text-white md:text-3xl text-2xl text-center relative">
		  <img class="h-full w-full text-center bg-gray-800 rounded-full" src={user.photoURL || profilepic()} alt="logo" />
				  <div className="absolute  bg-green-500 text-xs px-2 scale-75 rounded-full bottom-0 right-[11px] transform translate-x-2 translate-y-3 border-2 border-blue-200 text-black">Active</div>        
                </div>
				<span className="-mt-4 pb-4 flex px-3 text-center flex-col justify-center items-center">
				<h1 className="text-sm font-semibold  capitalize text-slate-600">{user.displayName || username}</h1>
				{/* <p className="text-sm break-all text-slate-800">{user.email}</p> */}
				</span>
			
        <Link to={"profile"}
			   className="text-medium block shadow-lg active:scale-90 transition-all rounded-full mb-3 py-2 px-9 text-center text-base bg-blue-900 text-white"
		    >
			View Profile
		  </Link>

      <button onClick={()=> logOut()}
			className="text-medium shadow-lg active:scale-90 transition-all rounded-full mb-5 py-2 px-9 text-center inline-flex items-center gap-2 text-base bg-red-300 text-red-500"
		  >
        <p className="font-semibold">Logout</p>
        <i className="fas mt-0.5 fa-arrow-right-from-bracket"></i>
		  </button>
      
		  </div> : 
		  <div className="bg-gradient-to-b h-40 from-blue-200 to-blue-400 w-full flex  items-center justify-center shadow-lg mt-8 rounded-3xl">
          <svg
            className="animate-spin w-10 text-violet-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>}
		</div>
	  
	);
  };
  
  export default FreeCard;