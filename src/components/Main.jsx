import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home";
import Enter from "./auth/Enter";
import Structure from "./dashboard/Structure";
import Myspace from "./dashboard/Myspace";
import Dashboard from "./dashboard/Home";
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Overview from './dashboard/Overview';
import Profile from './dashboard/Profile';
import About from './Home/Contact';
import Pricing from './Home/Pricing';

function Main() {
  return ( 
	<BrowserRouter>
		<UserAuthContextProvider>
			<Routes>
				<Route path='' element={<Navigate to='home' />} />
				<Route path='home' element={<Home/>} />
				<Route path='login' element={<Enter />} />
				<Route path='contact' element={<About />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='dashboard' element={<ProtectedRoute><Structure/></ProtectedRoute>} >
					<Route path='' element={<ProtectedRoute><Navigate to='overview' /></ProtectedRoute>} />
					<Route path='studio' element={<ProtectedRoute><Overview/></ProtectedRoute>} />
					<Route path='myspace' element={<ProtectedRoute><Myspace/></ProtectedRoute>} />
					<Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
					<Route path='overview' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
					<Route path='*' element={<ProtectedRoute><Navigate to='overview' /></ProtectedRoute>} />
				</Route>
				<Route path='*' element={<Navigate to='home' />} />
			</Routes>
		</UserAuthContextProvider>
	</BrowserRouter>
  )
}

export default Main
