import React from 'react'

function Overview() {
  return (
	<div class="w-full ">
    <div class="flex bg-white h-[90vh]">
        <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
                 <span class="text-2xl font-semibold text-gray-800 md:text-4xl">⏰ Coming<span class="ml-2 text-blue-600">Soon</span> ⏰</span>
                <h1 class="py-5 text-5xl font-semibold text-gray-800 md:text-6xl">Ai Image<span class="ml-2 text-blue-600">Studio</span></h1>
                
              <p class="mt-2 text-sm text-gray-500 md:text-lg"><a href="https://fontgenerator.org/">Unleash</a> your creativity with our upcoming cloud Point's <strong>AI Image Studio!</strong> Enhance, edit, and transform your images effortlessly with intelligent features and advanced editing tools. Experience the convenience of editing and accessing your photos from any device, anywhere.</p>
                
            </div>
        </div>
        <div class="hidden lg:block lg:w-1/2" >
            <div class="h-full object-cover bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80')]">
                <div class="h-full bg-blue-500 opacity-50"></div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Overview