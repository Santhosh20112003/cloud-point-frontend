import React from 'react'
import { Link } from 'react-router-dom'

function CTA2() {
  return (
	<section class="text-gray-600 body-font">
  <div class="container mx-auto flex lg:px-24 px-12 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
    <h1 className="px-8 py-3 bg-gray-100 text-sm rounded-full mb-5 font-bold text-[#8c89fe]">REAL TIME MULTI-PLATFORM ACCESS</h1>
      <h1 class="title-font sm:text-5xl text-3xl capitalize mb-4 font-bold text-gray-900">
        Access data from Various 
        <br class="hidden lg:inline-block" />Devices in Real time
      </h1>
      <p class="mb-8 leading-relaxed w-[80%]">Scalability in the context of cloud storage refers to the system's capability to adapt and accomodate changing storage requirements with ease and efficiency</p>
      <Link to='/login' class="flex justify-center items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
      <span class="text-white">Learn More</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link>
    </div>
    <div class=" lg:max-w-md lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover lg:-ml-24 object-center rounded" alt="hero" src="https://ik.imagekit.io/ikmedia/New_website_graphics/DAM_Storage/In-built_media_optimizations_and_transformations-01_m2FOU_H3v.png" />
    </div>
  </div>
</section>
  )
}

export default CTA2
