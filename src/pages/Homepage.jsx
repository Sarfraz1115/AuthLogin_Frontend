import React, { useState } from 'react'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Homepage = () => {
  const [username, setusername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    setusername(user || '');
  }, [])
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.href = '/login'; // Redirect to login page after logout
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="User Avatar"
            className="w-20 h-20 rounded-full shadow-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, <span className="text-purple-600">{username}</span>!</h1>
          <p className="text-gray-500 text-lg">You have successfully logged in.</p>
        </div>
        <button
          className="mt-8 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
          onClick={logout}
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Homepage