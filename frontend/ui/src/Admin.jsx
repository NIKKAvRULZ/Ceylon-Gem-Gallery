import { Routes, Route } from "react-router-dom";
import AdminGemCutHome from './components/Admin/AdminGemCutHome';
import AdminGemCutList from './components/Admin/AdminGemCutList';
import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';
import UpdateGemCut from './components/Admin/UpdateGemCut'; 
import Navbar from './components/Admin/AdminNavbar';
import Footer from './components/Admin/AdminFooter';

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/UpdateDetails/:id' element={<UpdateGemCut/>}/>
        <Route path="/AdminGemCutHome" element={<AdminGemCutHome />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts />} />
        <Route path='/' element={<AdminGemCutHome />} /> 

      </Routes>
      <Footer/>
    </div>
  );
};

export default Admin;
