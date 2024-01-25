import { getMetadata, listAll, ref } from 'firebase/storage';
import React, { createContext, useEffect, useState } from 'react';
import {Outlet } from 'react-router-dom';
import { storage } from '../../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export const MyContext = createContext("");

function Home() {
  const [totalSize, setTotalSize] = useState(0);
  const [totalSizePercent, setTotalSizePercent] = useState(0);
  const [fileImgCount, setFileImgCount] = useState(0);
  const [fileVideoCount, setFileVideoCount] = useState(0);
  const {user} = useUserAuth();
  const calculateTotalFileSize = async () => {
    try {
      const storageRef = ref(storage, user.email);
      const files = await listAll(storageRef);

      let totalSize = 0;
      let imgCount = 0;
      let videoCount = 0;

      for (const file of files.items) {
        const metadata = await getMetadata(file);
        totalSize += metadata.size;
        // Check if the content type is an image
        if (metadata.contentType.startsWith('image/')) {
          imgCount += 1;
        }
        // Check if the content type is a video
        if (metadata.contentType.startsWith('video/')) {
          videoCount += 1;
        }
      }
      setFileImgCount(imgCount);
      setFileVideoCount(videoCount);
      setTotalSize(totalSize);
      const maxTotalSize = 100 * 1024 * 1024; // 100MB
      const totalSizePercent = (totalSize / maxTotalSize) * 100;
      setTotalSizePercent(totalSizePercent);
    } catch (error) {
      console.error('Error calculating total file size:', error);
      setTotalSize(0);
      setTotalSizePercent(0);
    }
  };

  useEffect(()=>{
    calculateTotalFileSize()
  },[user])


  return (
    <MyContext.Provider value={{calculateTotalFileSize ,totalSize ,totalSizePercent ,setTotalSize ,setTotalSizePercent,fileVideoCount,fileImgCount}}>
    <div className="w-full h-screen flex">
      <Sidebar/>
          <div className="w-full h-screen bg-slate-100">
            <Navbar />
            <Outlet />
          </div>
    </div>
    </MyContext.Provider>
  )
}

export default Home
