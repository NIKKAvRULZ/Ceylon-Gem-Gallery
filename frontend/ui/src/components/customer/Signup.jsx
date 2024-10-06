import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegCustomer.css";

const Signup = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!Fname || !Lname || !Email || !Password) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    Axios.post("http://localhost:3000/auth/signup", {
      Fname,
      Lname,
      Email,
      Password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred during registration.");
      });
  };

  return (
    <div className="Mcontain_Reg101">
      <div className="form-container_Reg101">
        <h1 className="loginh1_Reg101">Register</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form_Reg101">
          <label htmlFor="first-name" className="form-label_Reg101">
            First Name:
          </label>
          <input
            type="text"
            id="first-name"
            className="form-input_Reg101"
            onChange={(e) => setFname(e.target.value)}
          />
          <br />

          <label htmlFor="last-name" className="form-label_Reg101">
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            className="form-input_Reg101"
            onChange={(e) => setLname(e.target.value)}
          />
          <br />

          <label htmlFor="email" className="form-label_Reg101">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input_Reg101"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="password" className="form-label_Reg101">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input_Reg101"
            onChange={(e) => setPassword(e.target.value)}
          />
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
