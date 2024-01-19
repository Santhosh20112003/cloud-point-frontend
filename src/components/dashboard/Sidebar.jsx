import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import {links} from '../../common/links';

function Sidebar() {
	const location = useLocation();
  return (
	<div className="min-w-[250px] lg:w-[10%] hidden bg-violet-500 h-screen lg:flex md:flex flex-col gap-3 items-center justify-start">
            <div className="w-full flex items-center justify-center h-24 hover:scale-105 transition-transform cursor-pointer">
              <Link to='/home' className="flex items-center justify-center w-[85%] bg-gray-800 px-2 py-3 shadow-md rounded-md">
                
                <span className="text-white text-2xl font-bold ml-2">Cloud Point</span>
              </Link>
            </div>
            <span className=" w-full flex flex-col items-start">
              
              <ul className='w-full flex flex-col items-center gap-3'>
                {links.map((link,index) => (
                  <Link to={link.link} key={index} className={`text-lg text-center py-3 rounded-md transition text-white font-medium w-[80%] ${
                    location.pathname.includes(link.link) ? 'bg-gray-800 shadow-lg' : ''
                  }`}>
                      <i className={`${link.icon} me-3`}></i>{link.name}
                  </Link>
                ))}
              </ul>
            </span>
          </div>
  )
}

export default Sidebar
