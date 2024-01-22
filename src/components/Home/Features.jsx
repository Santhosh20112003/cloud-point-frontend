import React from 'react'

function Features() {
  return (
	<section class="text-gray-600 body-font">
  <div class="container px-20 py-24 mx-auto">
    <div class="flex flex-col text-center  w-full mb-20">
	<h1 class="sm:text-4xl text-2xl font-bold title-font text-gray-900">We Offer the <span className="text-[#2170fd] italic">Best Features</span> From</h1>
      <h1 class="sm:text-4xl text-2xl font-bold mt-5 title-font text-gray-900">Us For Your Convenience</h1>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="p-4 md:w-1/3">
        <div class="flex border-s-8 border-[#3b82f6] rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
              <i className="w-5 h-5 fas fa-users"></i>
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">Collaboration</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">some platforms allow multiple users to edit same file simultaneously.</p>
            
          </div>
        </div>
      </div>
      <div class="p-4 md:w-1/3">
        <div class="flex border-s-8 border-[#3b82f6] rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
			<i className="w-5 h-5 fas fa-file-arrow-down"></i>
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">Offline Access</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">downoad certain files for offline access and pwa support.</p>
  
          </div>
        </div>
      </div>
      <div class="p-4 md:w-1/3">
        <div class="flex border-s-8 border-[#3b82f6] rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
			<i className="w-5 h-5 fab fa-dropbox"></i>
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">Backup and Restore</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">Back up and restore deleted data from trash</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Features
