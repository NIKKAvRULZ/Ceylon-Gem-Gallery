import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './update.css';

function ShowCustomerDetails() {
    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/customer/${id}`)
            .then((res) => {
                setCustomer(res.data);
            })
            .catch(() => {
                console.log("Error fetching customer details");
            });
    }, [id]);

    return (
        <div className='con'>
            <div className="customer-container">
            {/* Back link */}
                <div>
                    <br />
                    <Link to="/" className="back-link">Back to main</Link>
                </div>

                {/* Customer Details */}
                <br />
                <div>
                    <h1 className="customer-title">Customer Details</h1>
                    <p className="customer-description">This is the full details of the customer:</p>
                    <hr className="customer-divider" />
                    <br />
                </div>

                {/* Table displaying customer details */}
                <div>
                    <table className="customer-table">
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>First Name:</td>
                                <td>{customer.Fname}</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Last Name:</td>
                                <td>{customer.Lname}</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Email:</td>
                                <td>{customer.Email}</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Password:</td>
                                <td>{customer.Password}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Edit Customer Link */}
                <div>
                    <Link to={`/updatedetails/${customer._id}`} className="edit-link">
                        Edit Customer
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ShowCustomerDetails;
