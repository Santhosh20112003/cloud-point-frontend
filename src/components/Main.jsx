import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home";
import Enter from "./auth/Enter";
import Structure from "./dashboard/Structure";
import Myspace from "./dashboard/Myspace";
import Dashboard from "./dashboard/Home";
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Profile from './dashboard/Profile';

function Main() {
  return ( 
	<BrowserRouter>
		<UserAuthContextProvider>
			<Routes>
				<Route path='' element={<Navigate to='home' />} />
				<Route path='home' element={<Home/>} />
				<Route path='login' element={<Enter />} />
				<Route path='dashboard' element={<ProtectedRoute><Structure/></ProtectedRoute>} >
					<Route path='' element={<ProtectedRoute><Navigate to='home' /></ProtectedRoute>} />
					<Route path='home' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
					<Route path='myspace' element={<ProtectedRoute><Myspace/></ProtectedRoute>} />
					<Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
					<Route path='*' element={<ProtectedRoute><Navigate to='home' /></ProtectedRoute>} />
				</Route>
				<Route path='*' element={<Navigate to='home' />} />
			</Routes>
		</UserAuthContextProvider>
	</BrowserRouter>
  )
}

export default Main
