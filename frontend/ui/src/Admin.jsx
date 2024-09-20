import { Routes, Route } from "react-router-dom";

import Navbar from './components/Admin/AdminNavbar';
import Footer from './components/Admin/AdminFooter';

// cut
import AdminGemCutHome from './components/Admin/AdminGemCutHome';
import AdminGemCutList from './components/Admin/AdminGemCutList';
import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';
import UpdateGemCut from './components/Admin/UpdateGemCut';

// cost
import PaymentList from "./components/Admin/Cost/paymentlist";
import InsertPayment from "./components/Admin/Cost/InsertPayment";
import UpdatePayment from "./components/Admin/Cost/UpdatePayment";
import CostList from "./components/Admin/Cost/CostList";
import InsertCost from "./components/Admin/Cost/InsertCost";
import UpdateCost from "./components/Admin/Cost/UpdateCost";

import AdminPaymentManagement from './components/Admin/AdminPaymentManagement'


import ShowCustomerDetails from './components/Admin/customer/ShowCustomerDetails'
import UpdateCustomer from './components/Admin/customer/updateCustomer'
import CustomerList from "./components/Admin/customer/CustomerList";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* cut */}
        <Route path='/UpdateDetails/:id' element={<UpdateGemCut />} />
        <Route path="/AdminGemCutHome" element={<AdminGemCutHome />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts />} />
        <Route path='/' element={<AdminGemCutHome />} />
        <Route path='/AdminPaymentManagement' element={<AdminPaymentManagement />} />
        {/* cost */}

        <Route path="/payments" element={<PaymentList />} />
        <Route path="/insert-payment" element={<InsertPayment />} />
        <Route path="/update-payment/:id" element={<UpdatePayment />} />
        <Route path="/costs" element={<CostList />} />
        <Route path="/insert-cost" element={<InsertCost />} />
        <Route path="/update-cost/:id" element={<UpdateCost />} />


        <Route path='/customerList' element={<CustomerList />} />
        <Route path='/showcustomerdetails/:id' element={<ShowCustomerDetails />} />
        <Route path='/updatecustomerdetails/:id' element={<UpdateCustomer />} />


      </Routes>
      <Footer />
    </div>
  );
};

export default Admin;
