import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'

function TopBannar() {
	const [close,setClose] = useState(false);
	const show = {
		opacity: 1,
		display: "block"
	  };
	  
	  const hide = {
		opacity: 0,
		transitionEnd: {
		  display: "none"
		}
	  };
  return (
	<motion.div  onClick={()=>{setClose(!close)}} animate={close ? hide : show} className={`text-center ${close ? 'hidden':'block'} break-words cursor-pointer px-5 py-2  bg-primary text-white `}>
	  <h1 className="">🎉 Cloud Point is undergoing major enhancements with <span className="font-semibold text-gray-50">AI Image Studio</span>.</h1>
	</motion.div>
  )
}

export default TopBannar
