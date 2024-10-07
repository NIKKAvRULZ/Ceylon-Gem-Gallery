import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './update.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/customer');
                setCustomers(res.data);
            } catch (error) {
                console.log("Error fetching customer details", error);
            }
        };

        fetchCustomers();
    }, []);

    const onDeleteClick = (id) => {
        axios
            .delete(`http://localhost:3000/api/customer/${id}`)
            .then(() => {
                setCustomers(customers.filter((customer) => customer._id !== id));
            })
            .catch((err) => {
                console.log("Delete error", err);
            });
    }

    return (
        <div className='con'>
            <div className="customer-container">
                {/* Back link */}
                <div>
                    <br />
                    <Link to="/" className="back-link">Back to main</Link>
                </div>

                {/* Customers Details */}
                <br />
                <div>
                    <h1 className="customer-title">Customer Details</h1>
                    <button className='btn btn-outline-choose' onClick={() => navigate('/admin/addCustomer')}>Add Customers</button>
                    <p className="customer-description">This is the full list of customers:</p>
                    <hr className="customer-divider" />
                    <br />
                </div>

                {/* Table displaying customer details */}
                <div>
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No customers found!</td>
                                </tr>
                            ) : (
                                customers.map((customer, index) => (
                                    <tr key={customer._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{customer.Fname || "N/A"}</td>
                                        <td>{customer.Lname || "N/A"}</td>
                                        <td>{customer.Email || "N/A"}</td>
                                        <td>{customer.Password || "N/A"}</td>
                                        <td>
                                            <Link to={`/Admin/updatecustomerdetails/${customer._id}`} className="edit-link">Edit</Link>
                                            <button 
                                                className="edit-link" 
                                                onClick={() => onDeleteClick(customer._id)}
                                                style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomerList;
