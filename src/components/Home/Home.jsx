import React from 'react';
import {Link} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const HomePage = () => {
	const {user} = useUserAuth();
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 py-8 px-4">
        <h1 className="text-4xl font-bold text-white text-center">Welcome to Cloud Point</h1>
        <p className="text-lg text-white text-center mt-2">Your secure and reliable cloud storage provider</p>
      </header>
      <main className="container mx-auto py-12">
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-800">What We Offer</h2>
          <p className="text-gray-600 mt-4">Cloud Point provides a range of features and services to meet your cloud storage needs:</p>
          <ul className="list-disc list-inside mt-4">
            <li className="text-gray-600">Secure and encrypted storage to protect your data</li>
            <li className="text-gray-600 mt-2">Flexible storage plans to suit your requirements</li>
            <li className="text-gray-600 mt-2">Easy file sharing and collaboration with others</li>
            <li className="text-gray-600 mt-2">Automatic backups and version control</li>
          </ul>
        </section>
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-800">Get Started Today</h2>
          <p className="text-gray-600 mt-4">Sign up for a Cloud Point account and start experiencing the benefits of cloud storage:</p>
          <div className="flex justify-center">
            {user ?<Link to='/dashboard' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mt-4 ml-2">Dashboard</Link> :<Link to='/login' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mt-4 ml-2">Enter Your Account</Link>}
          </div>
        </section>
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-4">If you have any questions or need assistance, feel free to reach out to us:</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4">Contact Us</button>
        </section>
      </main>
      <footer className="bg-gray-800 py-4 px-4 text-white text-sm text-center">
        <p>© 2021 Cloud Point. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;