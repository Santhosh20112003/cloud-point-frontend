import React from 'react'
import { main_links } from '../../common/links'

function Footer() {
  return (
	<footer class="text-gray-600 body-font">
 
  <div class="bg-white">
    <div class="container mx-auto py-5 px-5 flex flex-wrap flex-col sm:flex-row">
      <p class="text-gray-500 text-sm text-center sm:text-left">© 2024 <span className="font-bold">Cloud Point</span> —
        <a href="https://santhosh-technologies.netlify.app" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@Santhosh Technologies</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        
        <a href='https://twitter.com/santhosh_201103/' class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href='https://www.instagram.com/santhosh_shanmugam_20/' class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        
      </span>
    </div>
  </div>
</footer>
  )
}

export default Footer
