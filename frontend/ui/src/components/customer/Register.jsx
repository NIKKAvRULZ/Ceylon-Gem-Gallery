import React, { useState } from 'react';
import './RegCustomer.css'; // Ensure you have styles for error states
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    // Manage state
    const [customerData, setCustomerData] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    const navigate = useNavigate();  // useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    // Validation function
    const validate = () => {
        let validationErrors = {};
        
        if (!customerData.Fname.trim()) {
            validationErrors.Fname = "First Name is required";
        }

        if (!customerData.Lname.trim()) {
            validationErrors.Lname = "Last Name is required";
        }

        if (!customerData.Email) {
            validationErrors.Email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(customerData.Email)) {
            validationErrors.Email = "Email address is invalid";
        }

        if (!customerData.Password) {
            validationErrors.Password = "Password is required";
        } else if (customerData.Password.length < 6) {
            validationErrors.Password = "Password must be at least 6 characters long";
        }

        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);  // Set errors if validation fails
            return;
        }

        // Submit data if no errors
        axios.post("http://localhost:3000/api/customer", customerData).then(() => {
            setCustomerData({
                Fname: "",
                Lname: "",
                Email: "",
                Password: "",
            });
            navigate('/login');  // Redirect after successful registration
        });
    };

    return (
        <div className='Mcontain_Reg101'>
            <div className="form-container_Reg101">
                <h1 className='loginh1_Reg101'>Register</h1>
                <form onSubmit={handleSubmit} className="form_Reg101">
                    <label htmlFor="first-name" className="form-label_Reg101">First Name:</label>
                    <input 
                        type="text" 
                        id="first-name" 
                        name="Fname" 
                        className={`form-input_Reg101 ${errors.Fname ? 'input-error_reg101' : ''}`}  // Apply error class if validation fails
                        onChange={handleChange}
                        value={customerData.Fname} 
                    />
                    {errors.Fname && <span className="error-text_reg101">{errors.Fname}</span>}
                    <br/>

                    <label htmlFor="last-name" className="form-label_Reg101">Last Name:</label>
                    <input 
                        type="text" 
                        id="last-name" 
                        name="Lname" 
                        className={`form-input_Reg101 ${errors.Lname ? 'input-error_reg101' : ''}`}
                        onChange={handleChange}
                        value={customerData.Lname} 
                    />
                    {errors.Lname && <span className="error-text_reg101">{errors.Lname}</span>}
                    <br/>

                    <label htmlFor="email" className="form-label_Reg101">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="Email" 
                        className={`form-input_Reg101 ${errors.Email ? 'input-error_reg101' : ''}`} 
                        onChange={handleChange} 
                        value={customerData.Email}
                    />
                    {errors.Email && <span className="error-text_reg101">{errors.Email}</span>}
                    <br/>

                    <label htmlFor="password" className="form-label_Reg101">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="Password" 
                        className={`form-input_Reg101 ${errors.Password ? 'input-error_reg101' : ''}`}
                        onChange={handleChange}
                        value={customerData.Password}
                    />
                    {errors.Password && <span className="error-text_reg101">{errors.Password}</span>}
                    <br/>

                    <button type="submit" className="form-button_Reg101">Register</button>
                </form>
                <Link to="/login" className='Haccount_Reg101'>Have an account</Link>
            </div>
        </div>
    );
}

export default Register;
