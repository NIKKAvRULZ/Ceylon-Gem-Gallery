import { useState, useEffect } from 'react';
import axios from "axios";
import CustomerCard from './CustomerCard';
import "./CustomerList.css";
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {

  const [coustomers, setCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/customer")
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      }).catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3000/api/customer/${id}`)
      .then(() => {
        setCustomer(coustomers.filter((coustomers) => coustomers._id !== id));
      })
      .catch((err) => {
        console.log("delete error", err);
      });
  }

  const customerList = coustomers.length === 0
    ? "No customers found !"
    : coustomers.map((customer) => (
      <CustomerCard key={customer._id} customer={customer} onDelete={onDeleteClick} />
    ));

  return (
    <div className='showCustomerList'>
      <button className='btn btn-outline-choose' onClick={() => navigate('/admin/addCustomer')}>Add Customers</button>
      <br /><br />
      <div className='container'>
        <div className='list'>{customerList}</div>
      </div>
    </div>
  )
}

export default CustomerList