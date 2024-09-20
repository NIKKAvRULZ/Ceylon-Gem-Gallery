import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Admin from './Admin';
import User from './User'

function App() {

  return (
    <div>
      <Router>
        <Routes>
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
