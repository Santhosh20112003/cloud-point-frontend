import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { links, profilepic } from '../../common/links';
import { useUserAuth } from '../context/UserAuthContext';



function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let [open, setOpen] = useState(false);
  const location = useLocation();
  const {user,logOut} = useUserAuth();
  const toggleNavbar = () => {
    setOpen(!open);
  };
  let icon =  "fas fa-bars";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeSidebar = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <nav className={`bg-gray-800 shadow-xl h-[10vh]`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-[10vh]">
          <div className="flex items-center">
            <span className="flex md:hidden lg:hidden">
              <i
                className={`text-2xl mt-0.5 active:scale-110 transition-transform ${icon} rounded-md transform duration-300 text-white py-2 px-3`}
                onClick={toggleNavbar}
              ></i>

              <ul
                className={`md:flex md:items-center w-[250px]  md:pb-0 pb-8 absolute md:static md:z-auto left-0 top-0 h-screen z-[30] md:w-auto md:pl-0  md:bg-transparent bg-violet-500 transition-all duration-500 ease-in ${
                  open ? "left-0 z-[-1] " : "left-[-250px] z-[-1]"
                }`}
              >
                <span className="flex bg-violet-900 h-[10vh] items-center justify-start  ps-4 w-full gap-1">
                  <img src={require('../assert/logo.ico')} alt="" className="h-10 w-10" />
                  <Link to="/home" className="text-white text-2xl font-bold">
                    SanTech API
                  </Link>
                  <i
                    onClick={toggleNavbar}
                    className="text-violet-300 fas fa-arrow-left mt-1 text-2xl absolute right-0 pe-2"
                  ></i>
                </span>
           
                <span className="flex items-center justify-center w-full mb-3">
              <Link to="home" className='text-lg mt-3 text-center py-3 mx-5 font-semibold w-full  text-gray-700 rounded-md bg-violet-300' onClick={closeSidebar} ><i className={`fas fa-house me-2`}></i>Overview</Link>
              </span>
                <span>
                {links.map((link) => (
                  <li
                    key={link.name}
                    className="md:ml-8 leading-none pl-9 w-full md:text-xl md:my-0 my-7"
                  >
                    <Link
                      to={link.link}
                      className={`text-white px-3 text-xl  py-2 rounded-md ${
						location.pathname.includes(link.link) ? 'bg-violet-500 text-black font-medium' : ''
					  }`}
                      onClick={closeSidebar}
                    >
                      <i className={`${link.icon} me-5`}></i>{link.name}
                    </Link>
                  </li>
                ))}
                <span className="flex items-center justify-center">
                
                </span>
                </span>
              </ul>
              
            </span>
            <div className="flex-shrink-0 flex items-center mt-0.5">
              <span className="text-white hidden lg:block md:block lg:text-xl text-2xl font-bold ml-1">
               API Dashboard
              </span>
              <span className="flex lg:hidden ml-2 items-center gap-3 md:hidden">
              <img src={require('../assert/logo.ico')} alt="" className="h-12 w-12" />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div
                onClick={toggleDropdown}
                className="flex w-fit items-center cursor-pointer gap-2"
              >
                <div className="h-12 w-12 rounded-full flex border border-gray-300 items-center justify-center text-white md:text-3xl text-2xl text-center relative">
                <img src={user.photoURL||profilepic()} alt="user_logo" className='h-10 w-10 rounded-full' />
                <div className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 right-1 transform md:translate-x-2 translate-x-0 translate-y-2 border border-white"></div>
                </div>        
              </div>
              
              {isDropdownOpen && (
                <div className="origin-top-right z-30 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="profile"
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                  
                    <button

					  onClick={(e)=>{
              localStorage.removeItem("token");
              logOut();
              window.location.href="/home"
           }}
                      className="block w-full text-start  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      
                      >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;