import { getMetadata, listAll, ref } from "firebase/storage";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { storage } from "../../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";
import { MyContext } from "./Structure";

const FreeCard = () => {
  const { user } = useUserAuth();
  const {calculateTotalFileSize  ,totalSizePercent} = useContext(MyContext);

  const [loading, setloading] = useState(false);
 
  const calculate = () =>{
    setloading(true)
    try{
      calculateTotalFileSize();
    }
    catch(err){
      console.log(err);
    }
    finally{
      setloading(false)
    }
    
  }
  
  useEffect(() => {
    calculate()
  }, [user])
  return (

    <div className="absolute bottom-4 left-2.5 flex w-[230px] mt-8  h-fit justify-center items-start">
      {!loading ?
        <div className=" w-full flex bg-white items-center justify-center flex-col shadow-lg relative rounded-3xl py-3 divide-y-2">


          <h1 className="text-md mt-3 font-semibold inline-flex items-center gap-1 capitalize text-slate-600"> {user.emailVerified && <img src={require('../assert/verified.png')} alt="verified" className="w-5 rounded-full" />}   {user?.displayName?.length > 18 ? `${user.displayName.slice(0,18)}..` : user.displayName } </h1>

          <span className="flex mt-3 pt-3 items-center justify-center">
            <div className="w-[100px] bg-gray-200 flex rounded-full me-3 h-3.5">
              <div className="bg-gradient-to-r from-[#3897f0] to-[#0084ff] h-3.5 rounded-full" style={{ width: `${totalSizePercent}%` }}></div>
            </div>
            {`${totalSizePercent.toFixed(1)}% used`}
          </span>
        </div> :
        <div class="bg-white shadow rounded-3xl p-5 max-w-sm w-full mx-auto">
          <span className="animate-pulse ">
            <div class="flex space-x-4">
              <div class="rounded-full bg-[#80cde8] h-10 w-10"></div>
              <div class="flex-1 space-y-6 py-1">
                <div class="h-5 bg-[#80cde8] rounded"></div>
              </div>

            </div>
            <div class="h-4 mt-3 bg-[#80cde8] rounded"></div>
          </span>
        </div>}
    </div>

  );
};

export default FreeCard;