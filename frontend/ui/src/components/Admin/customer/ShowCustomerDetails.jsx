import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShowCustomerDetails() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/customer/${id}`);
                setCustomer(res.data);
            } catch (err) {
                console.log("Error fetching customer details:", err);
                setError("Failed to load customer details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!customer) return <div>No customer found.</div>;

    return (
        <div>
            <h1>Customer Details</h1>
            <p>First Name: {customer.Fname}</p>
            <p>Last Name: {customer.Lname}</p>
            <p>Email: {customer.Email}</p>
            {/* Add more fields as necessary */}
        </div>
    );
}

export default ShowCustomerDetails;
