import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { random_login_img } from '../../common/links';

function Login() {

  const [loading,setloading] = useState(false);
  const { googleSignIn, GithubSignIn, FacebookSignIn } = useUserAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();


  const GoogleAuth = async () => {
    setloading(true)
    setErr("")
    try {
      await googleSignIn();
      navigate("/dashboard")
    }
    catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""))
    }
    finally{
      setloading(false)
    }
  }

  const GitHubAuth = async () => {
    setloading(true)
    setErr("")
    try {
      await GithubSignIn();
      navigate("/dashboard")
    }
    catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""))
    }
    finally{
      setloading(false)
    }
  }

  const FacebookAuth = async () => {
    setloading(true)
    setErr("")
    try {
      await FacebookSignIn();
      navigate("/dashboard")
    }
    catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""))
    }
    finally{
      setloading(false)
    }
  }

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <div className='flex h-[100vh] w-full'>
      <Link to="/home" className='fixed active:scale-105 transition-transform  flex items-center justify-center px-3 py-2.5 top-5 left-5 rounded-full shadow-lg
     bg-[#3b82f6] w-fit h-fit'>
       <i className="text-xl text-white fas fa-arrow-left font-bold"></i>
    </Link>
      <div className="flex min-h-[100vh] w-full lg:w-1/2 items-center flex-col justify-center px-6 py-12 lg:px-8 ">
        <span className='rounded-xl lg:border-gray-300 lg:shadow-none shadow-lg lg:border lg:w-[400px] p-5'>
          <div className="sm:mx-auto  sm:w-full sm:max-w-sm">

            <img className="mx-auto h-32 w-auto" src={require('../assert/logo.ico')} alt="Your Company" />

            <h2 className="text-[#049ce8] text-center text-4xl font-extrabold">Enter Your Space</h2>

            <h3 className="text-center mt-3 text-md text-gray-400 font-medium">Login and Start Using Cloud Point</h3>

          </div>
          {err && <p className='mt-5 text-center text-red-500'>{err}</p>}
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="flex flex-col my-5 max-w-md space-y-5">

              <button disabled={loading} onClick={GoogleAuth} class="flex disabled:border-blue-300 items-center justify-center flex-none  py-2  rounded-lg border-2 border-gray-300 bg-gray-50 font-medium text-gray-500 gap-5 active:bg-gray-200 active:scale-95 transition-all">

                <img class="w-5 " alt="G" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />

                <span className=''>Sign In with Google</span>
              </button>
              <button disabled={loading} onClick={GitHubAuth} class="flex items-center disabled:border-blue-300 justify-center flex-none  py-2  rounded-lg border-2 border-gray-300 bg-gray-50 font-medium text-gray-500 gap-5 active:bg-gray-200 active:scale-95 transition-all">

                <img class="w-5 " alt="G" src="https://ik.imagekit.io/vituepzjm/github-mark.svg" />

                <span className=''>Sign In with GitHub</span>
              </button>
              <button disabled={loading} onClick={FacebookAuth} class="flex items-center disabled:border-blue-300 justify-center flex-none  py-2  rounded-lg border-2 border-gray-300 bg-gray-50 font-medium text-gray-500 gap-5  active:bg-gray-200 active:scale-95 transition-all">

                <img class="w-5 " alt="G" src="https://ik.imagekit.io/vituepzjm/favicon.ico" />

                <span className=''>Sign In with Facebook</span>
              </button>
            </div>
          </div>
        </span>
      </div>
      <div className="hidden bg-gray-400 overflow-hidden relative lg:block w-1/2 h-full">
        <img src={random_login_img} alt="banner" className="brightness-75 relative w-100 h-full object-cover" />
        <span className="absolute left-5 top-[40vh] z-50">
          <h1 className="font-bold w-[500px] text-white text-5xl">Your Ultimate Cloud Storage Solution</h1>
          <h3 className="font-semibold w-96 mt-4 text-gray-200 text-xl">
            Simplify File Management and Secure Data Storage
            Jump to latest
          </h3>
        </span>
      </div>
    </div>
  )
}

export default Login
