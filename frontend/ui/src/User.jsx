import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/Footer';
import GemCutHome from './components/Cut/GemCutHome';
import GemCutList from './components/Cut/GemCutList';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import About from './components/About/About';

const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/GemCutHome" element={<GemCutHome />} />
        <Route path="/GemCutHome/CustomCut" element={<GemCutList />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default User;
