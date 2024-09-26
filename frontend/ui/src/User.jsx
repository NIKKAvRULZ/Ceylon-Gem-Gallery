import { Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Footer from './components/Footer';

import Home from './components/Home/Home';
import RawGemList from './components/Shop/RawGemList';
import About from './components/About/About';
import AddGem from './components/Shop/AddGem';
import DeleteGems from './components/Shop/GemList';

// cut
import GemCutHome from './components/Cut/GemCutHome';
import GemCutList from './components/Cut/GemCutList';
import ShowGemCutDetails from "./components/Cut/ShowGemCutDetails";

// cost
import InsertPayment from './components/Cost/InsertPayment';

// profile
import Profile from './components/customer/profile';


import TrackOrder from './components/Cut/TrackGemCut';
import ShowDetailsGems from "./components/Shop/ShowDetailsGems";

const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        
        {/* cut */}
        <Route path="/GemCutHome" element={<GemCutHome />} />
        <Route path="/GemCutHome/CustomCut" element={<GemCutList />} />
        <Route path='/showdetails/:id' element={<ShowGemCutDetails />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Shop" element={<RawGemList />} />
        <Route path="/Gdetails/:id" element={<ShowDetailsGems />} />
        <Route path="/About" element={<About />} />
        <Route path="/deleteGems" element={<DeleteGems />} />
        <Route path="/add-gem" element={<AddGem />} />
        
        {/* cost */}
        <Route path="/insert-payment" element={<InsertPayment />} />

        {/* user */}
        <Route path="/profile" element={<Profile />} />

      

        <Route path="/GemCutHome/track-order" element={<TrackOrder />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default User;
