import { Routes, Route } from "react-router-dom";
import AdminGemCutHome from './components/Admin/AdminGemCutHome';
import AdminGemCutList from './components/Admin/AdminGemCutList';
import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';

import Navbar from './components/Admin/AdminNavbar';
import Footer from './components/Admin/AdminFooter';

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/AdminGemCutHome" element={<AdminGemCutHome />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default Admin;
