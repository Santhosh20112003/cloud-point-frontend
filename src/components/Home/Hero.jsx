import React from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

function Hero() {
  const {user} = useUserAuth();
  return (
	<section class="text-gray-600">
  <div class="container mx-auto flex px-12 lg:px-12 lg:py-32 pt-24 lg:flex-row flex-col-reverse items-center">
    <div class="lg:flex-grow lg:w-1/2 lg:pr-24 lg:pl-12 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center">
      <h1 class="title-font lg:text-[45px] text-3xl leading-10 font-bold  mb-4  text-gray-900">Elevate Your Business With 
        <br class="lg:block hidden" /><span className=" lg:text-3xl ">Cutting-Edge Cloud Storage Solutions</span>
      </h1>
      <p class="mb-8 w-[80%] hidden lg:block text-sm md:text-base leading-relaxed">Elevate your to new heights as you harness as you  harness the power of the cloud. Explore a world of limitless possiblities.</p>
      {user ? <Link to='/dashboard' class="flex justify-center items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
        <span class="text-white">Go to your space</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link> : <Link to='/login' class="flex justify-center items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
        <span class="text-white">Access your Space</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link>}
    </div>
    <div class="lg:max-w-md max-w-[10rem] flex items-center justify-start lg:w-full w-5/6 lg:mb-0 mb-10">
      <img class="object-cover object-center rounded" alt="hero" src={require('../assert/verified.png')} />
    </div>
  </div>
</section>
  )
}

export default Hero
