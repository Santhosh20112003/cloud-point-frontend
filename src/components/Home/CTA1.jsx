import React from 'react'
import { Link } from 'react-router-dom'

function CTA1() {
  return (
	<section class="text-gray-600 body-font">
  <div class="container mx-auto flex lg:px-24 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-md lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
    <video autoPlay muted loop class="object-cover object-center rounded">
            <source src="https://ik.imagekit.io/ikmedia/New_website_graphics/Use_Case___Media_Upload_and_Management/Drag_and_drop_interface_D5vN0PtFN_3ePxQ_6vM.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-32 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="px-8 py-3 bg-gray-100 uppercase text-sm rounded-full mb-5 font-bold text-[#8c89fe]">Storage Capacity</h1>
      <h1 class="title-font sm:text-5xl text-3xl mb-4 font-bold text-gray-900">Adjust Storage Capacity
        <br class="hidden lg:inline-block" />According to Needs Easily
      </h1>
      <p class="mb-8 leading-relaxed w-[80%]">Scalability in the context of cloud storage refers to the system's capability to adapt and accomodate changing storage requirements with ease and efficiency</p>
      <Link to='/login' class="flex justify-center items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
      <span class="text-white">Learn More</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link>
    </div>
  </div>
</section>
  )
}

export default CTA1
