import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import {links} from '../../common/links';
import FreeCard from './FreeCard';

function Sidebar() {
	const location = useLocation();
  return (
	<div className="min-w-[250px] lg:w-[10%] hidden bg-[#80cde8] h-screen lg:flex md:flex flex-col gap-3 items-center justify-start">
            <div className="w-full flex items-center justify-center h-24  transition-transform cursor-pointer">
              <Link to='/home' className="flex items-center justify-center w-[95%] bg-gray-800 px-2 py-3 shadow-md rounded-md">
                <span className="text-white text-2xl inline-flex items-center justify-center font-bold "><img src={require('../assert/logo.ico')} className="h-14 scale-110 mr-3"/> Cloud Point</span>
              </Link>
            </div>
            <span className=" w-full flex flex-col items-start">
            <span className="flex items-center justify-center w-full mb-5">
              <Link to="overview" className='text-lg shadow-lg text-center py-3 mx-5 font-semibold w-full  text-gray-700 rounded-md bg-gray-300' >Overview</Link>
              </span>
              
              <ul className='w-full flex flex-col items-center gap-3'>
                {links.map((link,index) => (
                  <Link to={link.link} key={index} className={`text-lg active:scale-95 transition-all text-center py-3 rounded-md  text-gray-800 font-medium w-[80%] ${
                    location.pathname.includes(link.link) ? 'bg-gray-800 shadow-lg text-white' : ''
                  }`}>
                      <i className={`${link.icon} me-3`}></i>{link.name}
                  </Link>
                ))}
              </ul>
              <FreeCard />
            </span>
          </div>
  )
}

export default Sidebar
