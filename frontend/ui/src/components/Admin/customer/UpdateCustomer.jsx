import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './InsertCus.css';

function UpdateCustomer() {
    const [customer, setCustomers] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
    });
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/customer/${id}`);
                console.log("Fetched customer:", res.data); // Log fetched data
                setCustomers(res.data);
            } catch (err) {
                console.log("Error fetching customer:", err);
                setError("Failed to fetch customer details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    const onChange = (e) => {
        setCustomers({ ...customer, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!customer.Fname || !customer.Lname || !customer.Email || !customer.Password) {
            setError("All fields are required.");
            return;
        }

        const data = {
            Fname: customer.Fname,
            Lname: customer.Lname,
            Email: customer.Email,
            Password: customer.Password,
        };

        try {
            await axios.put(`http://localhost:3000/api/customer/${id}`, data);
            navigate(`/showcustomerdetails/${id}`);
        } catch (err) {
            console.log("Error in Update:", err);
            setError("Failed to update customer details.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Update Customer</h1> {/* Temporary check */}
            <div className='cont'>
                <Link to="/admin/customerList" className="simple-button-link">Show Customer List</Link>
            </div>

            <div className="form-container">
                <form noValidate onSubmit={onSubmit} className="form">
                    {error && <p className="error-message">{error}</p>}
                    
                    <label htmlFor="first-name" className="form-label">First Name:</label>
                    <input 
                        type="text" 
                        id="first-name" 
                        name="Fname" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Fname} 
                    />
                    <br/>

                    <label htmlFor="last-name" className="form-label">Last Name:</label>
                    <input 
                        type="text" 
                        id="last-name" 
                        name="Lname" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Lname} 
                    />
                    <br/>

                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="Email" 
                        className="form-input" 
                        onChange={onChange} 
                        value={customer.Email}
                    />
                    <br/>

                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="Password" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Password} 
                    />
                    <br/>

                    <button type="submit" className="form-button">Update Customer</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCustomer;
