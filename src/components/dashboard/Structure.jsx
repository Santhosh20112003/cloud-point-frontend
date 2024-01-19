import React, { useEffect } from 'react';
import {Outlet } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Home() {

  return (
    <div className="w-full h-screen flex">
      <Sidebar/>
          <div className="w-full h-screen bg-slate-100">
            <Navbar />
            <Outlet />
          </div>
    </div>
  )
}

export default Home
