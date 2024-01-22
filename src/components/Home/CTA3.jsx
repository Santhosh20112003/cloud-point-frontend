import React from 'react'
import { Link } from 'react-router-dom'

function CTA3() {
  return (
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex lg:px-24 px-12 py-24 md:flex-row flex-col items-center">
        <div class="lg:max-w-md lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <video autoPlay muted loop class="object-cover object-center rounded">
            <source src="https://ik.imagekit.io/ikmedia/New_website_graphics/Use_Case___Media_Upload_and_Management/AI_to_ease_media_organization_and_editing_workflows_zP3BkbXFjO.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="lg:flex-grow md:w-1/2 lg:pl-32 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <span className="flex mb-5 items-center justify-center gap-3">
        <h1 className="px-8 py-3 bg-gray-100 rounded-full uppercase text-sm font-bold text-[#8c89fe]">Image Studio</h1>
        <span className="px-4 py-2 bg-purple-200 font-bold rounded-full text-purple-500 text-sm">coming soon</span> 
        </span>
      <h1 class="title-font sm:text-5xl text-3xl mb-4 font-bold text-gray-900"> Browser-based image editor
        <br class="hidden lg:inline-block" />and Assert Management
      </h1>
      <p class="mb-8 leading-relaxed w-[80%]">Slash editing time and reduce dependency on graphic designers with a powerful yet easy-to-use in-built image editor.</p>
      <Link to='/login' class="flex justify-center items-center bg-blue-500 px-5 py-3 rounded-full  gap-3">
      <span class="text-white">Learn More</span>
		<i className="fas fa-arrow-right bg-white p-2 rounded-full"></i>
      </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA3
