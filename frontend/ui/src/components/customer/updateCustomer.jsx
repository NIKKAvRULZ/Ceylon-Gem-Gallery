import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UpdateCus.css";

const UpdateCustomer = () => {
  const [userData, setUserData] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div className="update-customer_UC101">
      <h2>Update Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Fname">First Name:</label>
          <input
            type="text"
            id="Fname"
            name="Fname"
            value={userData.Fname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Lname">Last Name:</label>
          <input
            type="text"
            id="Lname"
            name="Lname"
            value={userData.Lname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={userData.Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Password (leave blank if unchanged):</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={userData.Password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
