import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UpdateCus.css";

const UpdateCustomer = () => {
  const [userData, setUserData] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorFname, setErrorFname] = useState(""); // State for first name error
  const [errorLname, setErrorLname] = useState(""); // State for last name error
  const [errorEmail, setErrorEmail] = useState(""); // State for email error
  const [errorPassword, setErrorPassword] = useState(""); // State for password error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true,
        });
        setUserData({
          Fname: response.data.Fname,
          Lname: response.data.Lname,
          Email: response.data.Email,
          Password: "", // Keep password empty initially
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching profile information");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFnameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setUserData({ ...userData, Fname: value });
      setErrorFname("");
    } else {
      setErrorFname("Can't input numbers or symbols");
    }
  };

  const handleLnameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setUserData({ ...userData, Lname: value });
      setErrorLname("");
    } else {
      setErrorLname("Can't input numbers or symbols");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/^[a-z0-9@.]*$/.test(value)) {
      setUserData({ ...userData, Email: value });
      setErrorEmail("");
    } else {
      setErrorEmail(
        "Only lowercase letters, numbers, and '@' symbol are allowed"
      );
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, Password: value });
    if (value.length < 6) {
      setErrorPassword("Password must be at least 6 characters long");
    } else {
      setErrorPassword(""); // Clear error if valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (!errorFname && !errorLname && !errorEmail && !errorPassword) {
      try {
        const response = await Axios.put(
          "http://localhost:3000/auth/profile/update",
          userData,
          { withCredentials: true }
        );
        if (response.data.status) {
          setMessage("Profile updated successfully");
          navigate("/User/profileCard"); // Redirect to profile page after successful update
        } else {
          setMessage(response.data.message || "Error updating profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setMessage("Error updating profile");
      }
    }
  };

  return (
    <div className="Mcontain_UC101">
      <div className="form-container_UC101">
        <h1 className="loginh1_UC101">Update Profile</h1>
        <form onSubmit={handleSubmit} className="form_UC101">
          <label htmlFor="first-name" className="form-label_UC101">
            First Name:
          </label>
          <input
            type="text"
            id="first-name"
            name="Fname"
            value={userData.Fname}
            className="form-input_UC101"
            onChange={handleFnameChange}
            required
          />
          {errorFname && <p className="error-message_UC101">{errorFname}</p>}
          <br />
          <label htmlFor="last-name" className="form-label_UC101">
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            name="Lname"
            value={userData.Lname}
            className="form-input_UC101"
            onChange={handleLnameChange}
            required
          />
          {errorLname && <p className="error-message_UC101">{errorLname}</p>}
          <br />
          <label htmlFor="email" className="form-label_UC101">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={userData.Email}
            className="form-input_UC101"
            onChange={handleEmailChange}
            required
          />
          {errorEmail && <p className="error-message_UC101">{errorEmail}</p>}
          <br />
          <label htmlFor="password" className="form-label_UC101">
            Password:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password"
              placeholder="Leave blank if unchanging"
              value={userData.Password}
              className="form-input_UC101"
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-password_UC101"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errorPassword && (
            <p className="error-message_UC101">{errorPassword}</p>
          )}
          <br />
          <button type="submit" className="form-button_UC101">
            Update
          </button>
        </form>
        <Link to="/User/profileCard" className="Haccount_UC101">
          Back to Profile
        </Link>
      </div>
    </div>
  );
};

export default UpdateCustomer;