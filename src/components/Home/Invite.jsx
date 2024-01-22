import React from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext';

function Invite() {
  const {user} = useUserAuth();
  return (
	<section class="text-gray-600 bg-gradient-to-b from-white to-blue-400">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center items-center justify-center w-full mb-12">
	<h1 className="px-8 py-3 mb-5 bg-gray-100  rounded-full text-sm font-bold text-[#8c89fe]">Join With Us </h1>
      <h1 class="sm:text-4xl text-2xl lg:font-semibold font-bold title-font mb-4 text-gray-900 break-words">Try it now for an efficient and Secure storage experience!</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed lg:text-xl">Unlock seamless and secure digital storage with our cloud solution.Access your files anytime,anywhere.elevate your storage experience</p>
	 {user ?  <Link to='/dashboard' class="flex mt-10 justify-center  items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
      <span class="text-white">Explore More</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link> :  <Link to='/login' class="flex mt-10 justify-center  items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
      <span class="text-white">Get Started Now</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link>}
    </div>
   
  </div>
</section>
  )
}

export default Invite
