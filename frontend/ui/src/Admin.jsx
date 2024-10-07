import { Routes, Route } from "react-router-dom";

import Navbar from './components/Admin/AdminNavbar';
import Footer from './components/Admin/AdminFooter';
import AdminHome from './components/Admin/AdminHome';

// cut
import AdminGemCutHome from './components/Admin/AdminGemCutHome';
import AdminGemCutList from './components/Admin/AdminGemCutList';
import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';
import UpdateGemCut from './components/Admin/UpdateGemCut';

//shop
import AdminShopHome from "./components/Admin/Shop/AdminShopHome";
import AddGem from "./components/Admin/Shop/AddGem";
import GemList from "./components/Admin/Shop/GemList";
import UpdateGem from './components/Admin/Shop/UpdateGem';


//validation
import GemList2 from './components/Admin/Validation/GemList2';
import GemForm from './components/Admin/Validation/GemForm';
import PostCutGemList from './components/Admin/Validation/PostCutGemList';
import PostCutForm from './components/Admin/Validation/PostCutForm';
import UpdatePostCut from './components/Admin/Validation/UpdatePostCut';


// cost
import PaymentList from "./components/Admin/Cost/paymentlist";
import InsertPayment from "./components/Admin/Cost/InsertPayment";
import UpdatePayment from "./components/Admin/Cost/UpdatePayment";
import CostList from "./components/Admin/Cost/CostList";
import InsertCost from "./components/Admin/Cost/InsertCost";
import UpdateCost from "./components/Admin/Cost/UpdateCost";

import AdminPaymentManagement from './components/Admin/AdminPaymentManagement';

//staff
import StaffList from "./components/Admin/Staff/StaffList";
import StaffForm from "./components/Admin/Staff/StaffForm";
import UpdateStaff from "./components/Admin/Staff/UpdateStaff";
import TaskAssign from "./components/Admin/Staff/TaskAssign";
import ShowTask from "./components/Admin/Staff/ShowTask";
import UpdateTask from "./components/Admin/Staff/UpdateStaff";


import ShowCustomerDetails from './components/Admin/customer/ShowCustomerDetails';
import UpdateCustomer from './components/Admin/customer/updateCustomer';
import CustomerList from "./components/Admin/customer/CustomerList";
import InsertCustomer from './components/Admin/customer/InsertCustomer';


// job assignment and completion
import AssignJob from './components/Admin/AssignJob';
import CompleteJob from './components/Admin/CompleteJob';

//janidu gemdust
import AddGemDust from "./components/Admin/Gemdust/AddGemDust";
import GemdustDetails from "./components/Admin/Gemdust/GemdustDetails";

import UpdateGemdust from "./components/Admin/Gemdust/UpdateGemdust";
import AdminGemDustHome from './components/Admin/AdminGemDustHome';

//mihiran supplier
import SuplierForm from "./components/Admin/Supplier/SuplierForm";
import SuplierList from "./components/Admin/Supplier/SuplierList";
import UpdateSuplier from "./components/Admin/Supplier/UpdateSuplier";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/AdminHome' element={<AdminHome />} />
      <Route path='/' element={<AdminHome />} />


        {/* cut */}
        <Route path='/UpdateDetails/:id' element={<UpdateGemCut />} />
        <Route path="/AdminGemCutHome" element={<AdminGemCutHome />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts />} />

        {/*payment*/}
        <Route path='/AdminPaymentManagement' element={<AdminPaymentManagement />} />
        
        {/* Shop */}
        <Route path="/AdminShopHome" element={<AdminShopHome />} />
        <Route path="/AdminShopHome/AdminAddGem" element={<AddGem />} />
        <Route path="/AdminShopHome/AdminGemList" element={<GemList />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path='/UpdateGem/:id' element={<UpdateGem />} />




        {/* cost */}
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/insert-payment" element={<InsertPayment />} />
        <Route path="/update-payment/:id" element={<UpdatePayment />} />
        <Route path="/costs" element={<CostList />} />
        <Route path="/insert-cost" element={<InsertCost />} />
        <Route path="/update-cost/:id" element={<UpdateCost />} />

        <Route path='/customerList' element={<CustomerList />} />
        <Route path='/addCustomer' element={<InsertCustomer />} />
        <Route path='/showcustomerdetails/:id' element={<ShowCustomerDetails />} />
        <Route path='/updatecustomerdetails/:id' element={<UpdateCustomer />} />

        {/* job assignment and completion */}
        <Route path="/assign-job" element={<AssignJob />} />
        <Route path="/complete-job" element={<CompleteJob />} />

        {/* staff */}
        <Route path="/staff" element={<StaffList />} />
        <Route path="/add-staff" element={<StaffForm />} />
        <Route path="/update-staff/:id" element={<UpdateStaff />} />

        {/* staff part 2 */}
        <Route path="/task-assign/:id" element={<TaskAssign />} />
        <Route path="/show-task" element={<ShowTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />

        {/*Gem Dust*/}
        <Route path="/addgemdust" element={<AddGemDust />} />
        <Route path="/update-gemdust/:id" element={<UpdateGemdust/>} />
        <Route path="/GemDustDetails" element={<GemdustDetails />} />
        <Route path="/AdminGemDustHome" element={<AdminGemDustHome />} />

        {/* validation */}
        <Route path="/validation" element={<GemList2 />} />
        <Route path="/validation-add" element={<GemForm />} />
        <Route path="/validation-update/:id" element={<GemForm />} />
        <Route path="/validation-details/" element={<PostCutGemList />} />
        <Route path="/validation-postcut/:id" element={<UpdatePostCut />} />
        <Route path="/validation-postcutf/:id" element={<PostCutForm />} />

        {/* Supplier */}
        <Route path="/add-suplier" element={<SuplierForm/>} />
        <Route path="/suplier-list" element={<SuplierList/>} />
        <Route path="/update-suplier/:id" element={<UpdateSuplier />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Admin;
