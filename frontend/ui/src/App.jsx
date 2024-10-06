import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from './Admin';
import User from './User';
import AdminLogin from './components/Login/AdminLogin';
import UserLogin from './components/Login/UserLogin';
import WorkerLogin from './components/Login/WorkerLogin';
import LoginHome from './components/LoginHome';
import StaffList from "./components/Admin/Staff/StaffList";
import AddGemDust from "./components/Admin/Gemdust/AddGemDust";
import GemdustDetails from "./components/Admin/Gemdust/GemdustDetails";
import Home from "./components/Admin/Gemdust/GemdustHome";
import UpdateGemdust from "./components/Admin/Gemdust/UpdateGemdust";
import UserHome from "./components/Gemdust/UserHome";
import GemShop from "./components/Gemdust/Gemshop";


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
          <Route path="/staff" element={<StaffList />} />
          {/* <Route path="/addgemdust" element={<AddGemDust />} />
          <Route path="/GemDustDetails" element={<GemdustDetails />} /> */}
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/GemDustDetails/:id" element={<UpdateGemdust />} /> */}
          {/* <Route path="/UserHome" element={<UserHome />} />
          <Route path="/gemshop/:id" element={<GemShop />} />{" "} */}

        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
