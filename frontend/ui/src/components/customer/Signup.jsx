import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegCustomer.css";

const Signup = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorFname, setErrorFname] = useState(""); // State for first name error
  const [errorLname, setErrorLname] = useState(""); // State for last name error
  const [errorEmail, setErrorEmail] = useState(""); // State for email error
  const [errorPassword, setErrorPassword] = useState(""); // State for password error

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    if (!errorFname && !errorLname && !errorEmail && !errorPassword) {
      Axios.post("http://localhost:3000/auth/signup", {
        Fname,
        Lname,
        Email,
        Password,
      })
        .then((response) => {
          if (response.data.status) {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Handle first name input
  const handleFnameChange = (e) => {
    const value = e.target.value;
    // Check if the input is valid (only letters and spaces)
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFname(value);
      setErrorFname(""); // Clear error if valid
    } else {
      setErrorFname("Can't input numbers or symbols");
    }
  };

  // Handle last name input
  const handleLnameChange = (e) => {
    const value = e.target.value;
    // Check if the input is valid (only letters and spaces)
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setLname(value);
      setErrorLname(""); // Clear error if valid
    } else {
      setErrorLname("Can't input numbers or symbols");
    }
  };

  // Handle email input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    // Check if the input is valid (only lowercase letters, numbers, '@', and '.')
    if (/^[a-z0-9@.]*$/.test(value)) {
      setEmail(value);
      setErrorEmail(""); // Clear error if valid
    } else {
      setErrorEmail("Only lowercase letters, numbers, and '@' symbol are allowed");
    }
  };

  // Handle password input
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value); // Update the password value

    // Check if the password meets the minimum length requirement
    if (value.length < 6) {
      setErrorPassword("Password must be at least 6 characters long");
    } else {
      setErrorPassword(""); // Clear error if valid
    }
  };

  return (
    <div className="Mcontain_Reg101">
      <div className="form-container_Reg101">
        <h1 className="loginh1_Reg101">Register</h1>
        <form onSubmit={handleSubmit} className="form_Reg101">
          <label htmlFor="first-name" className="form-label_Reg101">
            First Name:
          </label>
          <input
            type="text"
            id="first-name"
            className="form-input_Reg101"
            onChange={handleFnameChange}
            value={Fname}
            required
          />
          {errorFname && <p className="error-message_Reg101">{errorFname}</p>}
          <br />

          <label htmlFor="last-name" className="form-label_Reg101">
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            className="form-input_Reg101"
            onChange={handleLnameChange}
            value={Lname}
            required
          />
          {errorLname && <p className="error-message_Reg101">{errorLname}</p>}
          <br />

          <label htmlFor="email" className="form-label_Reg101">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input_Reg101"
            onChange={handleEmailChange}
            value={Email}
            required
          />
          {errorEmail && <p className="error-message_Reg101">{errorEmail}</p>}
          <br />

          <label htmlFor="password" className="form-label_Reg101">
            Password:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input_Reg101"
              onChange={handlePasswordChange} // Use the new password handler
              value={Password}
              required
            />
            <button
              type="button"
              className="toggle-password_Reg101"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errorPassword && <p className="error-message_Reg101">{errorPassword}</p>} {/* Error message for password */}
          <br />
          <button type="submit" className="form-button_Reg101">
            Register
          </button>
        </form>
        <Link to="/login" className="Haccount_Reg101">
          Have an account
        </Link>
      </div>
    </div>
  );
};

export default Signup;