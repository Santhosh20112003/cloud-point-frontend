import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../context/UserAuthContext';
import { random_login_img } from '../../common/links';

function Login() {


  const {googleSignIn,GithubSignIn,FacebookSignIn} = useUserAuth();
  const [err,setErr] = useState("");
  const navigate = useNavigate();


  const GoogleAuth = async()=>{
	setErr("")
	try{
		await googleSignIn();
		navigate("/dashboard")
	}
	catch(err){
		setErr(err.message.replace("Firebase:","").replace(".",""))
	  }
  }

  const GitHubAuth = async()=>{
	setErr("")
	try{
		await GithubSignIn();
		navigate("/dashboard")
	}
	catch(err){
		setErr(err.message.replace("Firebase:","").replace(".",""))
	  }
  }

  const FacebookAuth = async()=>{
	setErr("")
	try{
		await FacebookSignIn();
		navigate("/dashboard")
	}
	catch(err){
		setErr(err.message.replace("Firebase:","").replace(".",""))
	  }
  }
	
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  
  return (
	<div className='flex h-[100vh] w-full'>
      <Link to="/home" className='fixed active:scale-105 transition-transform  px-3.5 py-2 top-5 left-5 rounded-full shadow-lg
     bg-violet-500 w-fit h-fit'>
       <i className="text-xl text-white fas fa-arrow-left font-bold"></i>
    </Link>
      <div className="flex min-h-[100vh] w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={require('../assert/logo.ico')} alt="Your Company" />
          <h2 className="text-gray-600 text-center text-2xl font-semibold leading-9 tracking-tight  ">Cloud Point</h2>
         
        </div>
        {err && <p className='mt-5 text-center text-red-500'>{err}</p>}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div class="flex flex-col mt-5 max-w-md space-y-5">
          
            <button onClick={GoogleAuth} class="flex items-center justify-center flex-none  py-2  rounded-lg border-2 border-[#5195ee] font-medium bg-[#5195ee] text-white relative">
              <span class="absolute left-0 h-full px-3 inline-flex items-center justify-center rounded-s-lg bg-white">
              <img class="w-5 " alt="G" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"/>
              </span>
              <span className='ps-5 md:ps-0'>Sign In with Google</span>
            </button>
            <button onClick={GitHubAuth} class="flex items-center justify-center flex-none  py-2  rounded-lg border-2 border-[#010409] font-medium bg-[#010409] text-gray-200 relative">
              <span class="absolute left-0 h-full px-3 inline-flex items-center justify-center rounded-s-lg bg-white">
              <img class="w-5 " alt="G" src="https://ik.imagekit.io/vituepzjm/github-mark.svg"/>
              </span>
              <span className='ps-5 md:ps-0'>Sign In with GitHub</span>
            </button>
			<button onClick={FacebookAuth} class="flex items-center justify-center flex-none  py-2  rounded-lg border-2 border-[#0866ff] font-medium bg-[#0866ff] text-gray-200 relative">
              <span class="absolute left-0 h-full px-3 inline-flex items-center justify-center rounded-s-lg bg-white">
              <img class="w-5 " alt="G" src="https://facebook.com/favicon.ico"/>
              </span>
              <span className='ps-5 md:ps-0'>Sign In with Facebook</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden overflow-y-hidden lg:block w-1/2 h-full">
        <img src={random_login_img}  alt="banner" className="brightness-75 w-100 h-full object-cover" />
      </div>
    </div>
  )
}

export default Login
