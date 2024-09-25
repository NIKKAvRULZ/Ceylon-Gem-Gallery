import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from './Admin';
import User from './User';
import AdminLogin from './components/Login/AdminLogin';
import UserLogin from './components/Login/UserLogin';
import WorkerLogin from './components/Login/WorkerLogin';
import LoginHome from './components/LoginHome';
import ProfileList from './components/customer/profileList';
import Profile from './components/customer/profile';
import Register from './components/customer/Register';
import Login from './components/customer/Login'

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path='/' element={<LoginHome />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/UserLogin' element={<UserLogin />} />
          <Route path='/user/*' element={<User />} />
          <Route path='/WorkerLogin' element={<WorkerLogin />} />
          <Route path='/worker/*' element={<Worker />} />

          {/* Customer */}
          <Route path='/profileList' element = {<ProfileList />} />
          <Route path='/profile' element = {<Profile />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/login' element = {<Login />} />

        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
