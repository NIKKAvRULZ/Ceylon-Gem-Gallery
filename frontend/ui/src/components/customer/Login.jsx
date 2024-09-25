import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    });
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
            return;
        }
    
        // If no validation errors, proceed to login
        axios.post('http://localhost:3000/api/login', loginData)
            .then((response) => {
                // Handle successful login here, like saving a token and navigating
                const { token, user } = response.data;
    
                // Store token in localStorage (or cookies if preferred)
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));
    
                // Redirect to dashboard or home page
                navigate('/dashboard');
            })
            .catch((error) => {
                // Handle error cases (like invalid credentials)
                console.error('Login error:', error.response);
                setErrors({ apiError: 'Invalid email or password' });
            });
    };

    return (
        <div className="login-container_Log101">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>Email:</label>
                <input type="email" name="Email" value={loginData.Email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="Password" value={loginData.Password} onChange={handleChange} required />

                <button type="submit" className="btn_Log101">Login</button>

                <p>Don't have an account? <Link to="/">Register here</Link></p>
            </form>
        </div>
    );
};

export default Login;