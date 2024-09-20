import { useState } from 'react'
import './App.css'

import Navbar from './components/navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Admin from './Admin';
import User from './User'

// import GemCutList from './components/Cut/GemCutList';
// import AdminGemCutList from './components/Admin/AdminGemCutList';
// import GemCutHome from './components/Cut/GemCutHome';

// import AdminGemCutHome from './components/Admin/AdminGemCutHome';
// import Home from './components/Home/Home';
// import Shop from './components/Shop/Shop';
// import About from './components/About/About';
// import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';
// import ShowGemCutDetails from './components/Cut/ShowGemCutDetails';
// import UpdateGemCut from './components/Admin/UpdateGemCut';

function App() {

  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/GemCutHome" element={<GemCutHome/>} />
            <Route path="/GemCutHome/CustomCut" element={<GemCutList/>} />
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Shop" element={<Shop/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path='/showdetails/:id' element={<ShowGemCutDetails/>}/>
            <Route path='/' element={<Home/>}/> */}


          {/* <Route path='/UpdateDetails/:id' element={<UpdateGemCut/>}/>
            <Route path="/AdminGemCutHome" element={<AdminGemCutHome/>} />
            <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList/>} />
            <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts/>} /> */}

          <Route path='/' element={<Navigate to={'/user/Home'} />} />

          <Route path='/admin/*' element={<Admin />} />
          <Route path='/user/*' element={<User />} />

        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App
