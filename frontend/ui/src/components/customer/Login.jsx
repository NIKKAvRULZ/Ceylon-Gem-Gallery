import React, { useState } from "react";
import "../customer/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      Email,
      Password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/User/Home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container Login_01">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn Login_01">
          Login
        </button>

        <p>
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
