import { Routes, Route } from "react-router-dom";

import Navbar from './components/Admin/AdminNavbar';
import Footer from './components/Admin/AdminFooter';

// Gem Cutting
import AdminGemCutHome from './components/Admin/AdminGemCutHome';
import AdminGemCutList from './components/Admin/AdminGemCutList';
import AdminAddGemCuts from './components/Admin/AdminAddGemCuts';
import UpdateGemCut from './components/Admin/UpdateGemCut';

// Cost Management
import PaymentList from "./components/Admin/Cost/paymentlist";
import InsertPayment from "./components/Admin/Cost/InsertPayment";
import UpdatePayment from "./components/Admin/Cost/UpdatePayment";
import CostList from "./components/Admin/Cost/CostList";
import InsertCost from "./components/Admin/Cost/InsertCost";
import UpdateCost from "./components/Admin/Cost/UpdateCost";

// Customer Management
import ShowCustomerDetails from './components/Admin/customer/ShowCustomerDetails';
import UpdateCustomer from './components/Admin/customer/updateCustomer';
import CustomerList from "./components/Admin/customer/CustomerList";
import InsertCustomer from './components/Admin/customer/InsertCustomer';
import AdminPaymentManagement from './components/Admin/AdminPaymentManagement';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Gem Cutting Routes */}
        <Route path="/AdminGemCutHome" element={<AdminGemCutHome />} />
        <Route path="/AdminGemCutHome/AdminGemCutList" element={<AdminGemCutList />} />
        <Route path="/AdminGemCutHome/AdminAddGemCuts" element={<AdminAddGemCuts />} />
        <Route path="/UpdateDetails/:id" element={<UpdateGemCut />} />

        {/* Payment Routes */}
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/insert-payment" element={<InsertPayment />} />
        <Route path="/update-payment/:id" element={<UpdatePayment />} />
        <Route path="/costs" element={<CostList />} />
        <Route path="/insert-cost" element={<InsertCost />} />
        <Route path="/update-cost/:id" element={<UpdateCost />} />

        {/* Customer Management Routes */}
        <Route path="/customerList" element={<CustomerList />} />
        <Route path="/addCustomer" element={<InsertCustomer />} />
        <Route path="/showcustomerdetails/:id" element={<ShowCustomerDetails />} />
        <Route path="/updatecustomerdetails/:id" element={<UpdateCustomer />} />

        {/* Admin Payment Management */}
        <Route path="/AdminPaymentManagement" element={<AdminPaymentManagement />} />

        {/* Catch-all Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Admin;
