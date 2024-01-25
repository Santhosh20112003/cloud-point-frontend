import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import hello from '../assert/cloud-bannar.svg';
import { useContext } from 'react';
import { MyContext } from './Structure';

function Home() {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const {calculateTotalFileSize , fileImgCount ,fileVideoCount ,totalSize ,totalSizePercent} = useContext(MyContext);


  const bytesToMB = (bytes) => {
    if (bytes === 0) return '0 MB';

    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  };

  const calculate = () =>{
    setLoading(true)
    try{
      calculateTotalFileSize();
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false)
    }
    
  }

  useEffect(() => {
    calculate();
  }, [user]);

  return (
    <div className="w-full h-[90vh] bg-gray-200 overflow-y-scroll max-h-[90vh] flex flex-col">
      <div className="w-[96%] mt-5 shadow-md px-5 py-14 flex items-center justify-center md:gap-5 md:justify-evenly rounded-xl bg-gray-100 bg-[url('https://dashboard.algolia.com/client-assets/c1c9361fe75370d1b156733e962f7214/514f2ec3798090c6df00dad1592c8166.svg')] mx-auto">
        <span className="mt-10">
          <h1 className="lg:text-4xl text-3xl text-center md:text-left font-medium title-font mb-4 italic text-gray-900">
            Welcome{' '}
            <span className="text-[#218ff5] font-semibold break-words capitalize">
              {user.displayName}
            </span>
            !
          </h1>
          <p className="text-gray-500 ms-5 break-words text-center md:text-left text-base md:text-lg">Check what's happening on your Cloud Point Dashboard.</p>
        </span>
        <span className="hidden lg:flex">
          <img src={hello} alt="" className="w-80" />
        </span>
      </div>
      <span className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 py-16 mx-auto md:mx-0 md:px-10 md:w-full w-[90%]">
        <span className="shadow-lg border-2 border-[#a6e7ff] bg-[#a6e7ff] p-5 rounded-lg">
          {loading ? (
            <span className="animate-pulse">
              <div className="text-xl h-5 w-[20%] rounded-full font-semibold bg-[#2ebdf1]"></div>
              <div className="text-lg mt-5 h-4 w-[90%] rounded-full bg-[#2ebdf1]"></div>
            </span>
          ) : (
            <span className="">
              <h1 className="text-xl font-semibold text-gray-800">Total Storage Size</h1>
              <p className="text-lg mt-3">{bytesToMB(totalSize)}</p>
            </span>
          )}
        </span>
        <span className="shadow-lg border-2 border-[#a6e7ff] bg-[#a6e7ff] p-5 rounded-lg ">
          {loading ? (
            <span className="animate-pulse">
              <div className="text-xl h-5 w-[20%] rounded-full font-semibold bg-[#2ebdf1]"></div>
              <div className="text-lg mt-5 h-4 w-[90%] rounded-full bg-[#2ebdf1]"></div>
            </span>
          ) : (
            <span className="">
              <h1 className="text-xl font-semibold text-gray-800">File Count</h1>
              <p className="text-lg mt-3">{`${fileImgCount} Images & ${fileVideoCount} Videos`}</p>
            </span>
          )}
        </span>
        <span className="shadow-lg border-2 border-[#a6e7ff] bg-[#a6e7ff] p-5 rounded-lg ">
          {loading ? (
            <span className="animate-pulse">
              <div className="text-xl h-5 w-[20%] rounded-full font-semibold bg-[#2ebdf1]"></div>
              <div className="text-lg mt-5 h-4 w-[90%] rounded-full bg-[#2ebdf1]"></div>
            </span>
          ) : (
            <span className="">
              <h1 className="text-xl font-semibold text-gray-800">Storage Used Percentage</h1>
              <p className="text-lg mt-3">{`${totalSizePercent.toFixed(1)}% of Total`}</p>
            </span>
          )}
        </span>
      </span>
    </div>
  );
}

export default Home;