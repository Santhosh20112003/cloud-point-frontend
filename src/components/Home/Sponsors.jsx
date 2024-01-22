import React from 'react'

function Sponsors() {
  return (
	<marquee loop behavior='scrolling'  scrollAmount={15} scrolldelay={0} className='w-full bg-gradient-to-tr flex-wrap from-primary to-two py-8 px-5 flex items-center justify-center'>
	  <span className="text-2xl lg:text-3xl ml-5  font-semibold font-adv text-gray-300">Cloud Storage</span>
	  <span className="text-2xl lg:text-3xl ml-5 font-semibold font-adv text-gray-300">Authentication</span>
	  <span className="text-2xl lg:text-3xl ml-5 font-semibold font-adv text-gray-300">Tailwindcss</span>
	  <span className="text-2xl lg:text-3xl ml-5 font-semibold font-adv text-gray-300">Radix Ui</span>
	  <span className="text-2xl lg:text-3xl ml-5 font-semibold font-adv text-gray-300">Toastify</span>
	</marquee>
  )
}

export default Sponsors
