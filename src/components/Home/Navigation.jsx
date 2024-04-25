import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { main_links as links } from "../../common/links";
import { useUserAuth } from "../context/UserAuthContext";

function Navigation() {
  const location = useLocation();
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col h-[10vh] bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md lg:shadow-none">
        <Link to="/home" className="flex items-center justify-center gap-2">
          <img
            src={require("../assert/logo.ico")}
            alt=""
            className="h-14 object-fill"
          />
          <h1 className=" md:flex hidden text-2xl text-primary font-bold">
            Cloud Point
          </h1>
        </Link>
        <div className="bg-gray-200 hidden lg:flex p-1 rounded-full gap-3 items-center justify-center">
          {links.map((item) => (
            <Link
              to={item.link}
              className={`px-5 py-2 rounded-full ${
                location.pathname.includes(item.link)
                  ? "bg-white active:scale-90 transition-all  font-semibold text-primary"
                  : ""
              } `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center ml-2 justify-center">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2  active:scale-90 border-2 border-white outline outline-[3px] outline-blue-500 transition-all bg-blue-500 text-center text-white rounded-full"
            >
              Your Space
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2  active:scale-90 border-2 border-white outline outline-[3px] outline-blue-500 transition-all bg-blue-500 text-center text-white rounded-full"
            >
              Access Now
            </Link>
          )}
          <div className="ml-5 lg:hidden">
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              <i className="fas text-xl mt-2 text-primary active:scale-90 transition-all fa-bars"></i>
            </button>
            <ul
              className={`lg:flex lg:items-center w-full lg:pb-0 pb-8 absolute lg:static lg:z-auto left-0 top-0 h-[70vh] z-[30] lg:w-auto   lg:bg-transparent bg-white transition-all duration-500 ease-in ${
                open ? "top-0 z-[-1]" : "top-[-100vh] z-[-1]"
              }`}
            >
              <span className="flex bg-gray-800 items-center justify-start ps-4 w-full gap-3 border-e-2 border-gray-600 h-[10vh]">
                {/* <img src={require('../assert/logo.ico')} alt="" className="h-14" /> */}
                <Link to="/home" className="text-white text-2xl font-bold">
                  Cloud Point
                </Link>
              </span>

              <div className="w-full pb-3">
                {links.map((link) => (
                  <li
                    key={link.name}
                    className="lg:ml-8 leading-none w-full flex items-center justify-center lg:text-xl lg:my-0 my-7"
                  >
                    <Link
                      to={link.link}
                      className={` text-black px-3 text-xl w-[80%] py-2 rounded-md ${
                        location.pathname.includes(link.link)
                          ? "bg-gray-800  font-medium text-white"
                          : ""
                      }`}
                      onClick={() => setOpen(!open)}
                    >
                      <i className={`${link.icon} me-5`}></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </div>

              <span
                className="flex cursor-pointer items-center w-full absolute bottom-0 right-0 active:bg-blue-100 rounded-lg active:scale-75 transition-all h-[20vh] justify-center "
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <i className="fas fa-angle-left text-5xl rotate-90   text-gray-300"></i>
              </span>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navigation;
