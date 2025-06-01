import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
const App = () => {

  // const location = useLocation();

  // const isAuthenticated = !!localStorage.getItem('token');
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };


  return (

    <div>
      <Routes>
        <Route path='/' element={isAuthenticated() ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path='/signup' element={!isAuthenticated() ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated() ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>

  );
}



export default App;
