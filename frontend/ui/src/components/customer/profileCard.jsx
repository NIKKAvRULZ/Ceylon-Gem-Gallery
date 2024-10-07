import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./ProfileCard.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleLogout = () => {
    Axios.get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    // Trigger SweetAlert when deleting account
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed && profile) {
            Axios.delete("http://localhost:3000/auth/delete") // Make a DELETE request to the backend
                .then(() => {
                    navigate("/login"); // Redirect to homepage after deletion
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your account has been deleted.",
                        icon: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error deleting account:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting your account.",
                        icon: "error",
                    });
                });
        }
    });
};

  useEffect(() => {
    // Fetch the user's profile when the component mounts
    Axios.get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setProfile(response.data); // Set the profile data to state
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []); // Removed location.state from the dependency array

  if (!profile) {
    return (
      <div className="loader-container_PC101">
        <div className="loader_PC101"></div>
      </div>
    );
  }

  // Check if profile.Password exists before trying to access its length
  const maskedPassword = profile.Password
    ? "*".repeat(profile.Password.length)
    : "";

  return (
    <div className="Main_div_PC101">
      <div className="mcontiner_PC101">
        <h1 className="headers2_PC101">Profile</h1>
        <div className="email-container_PC101">
          <h3 className="email-label_PC101">Email</h3>
          <div className="email-content_PC101">
            <span className="email-text_PC101">{profile.Email}</span>
            
          </div>
        </div>
        <div className="email-container_PC101">
          <h3 className="email-label_PC101">Password</h3>
          <div className="email-content_PC101">
            {/* Display asterisks instead of the actual password */}
            <span className="email-text_PC101">{maskedPassword}</span>
            
          </div>
        </div>
        <br />
        <h2 className="headers2_PC101">Personal Information</h2>
        <div className="email-container_PC101">
          <h3 className="email-label_PC101">First name</h3>
          <div className="email-content_PC101">
            <span className="email-text_PC101">{profile.Fname}</span>
            
          </div>
        </div>
        <div className="email-container_PC101">
          <h3 className="email-label_PC101">Last name</h3>
          <div className="email-content_PC101">
            <span className="email-text_PC101">{profile.Lname}</span>
          </div>
        </div>
        <div className="change_div_PC101">
        <Link to={"/User/profile/update"} className="change-btn_PC101">
              Edit Details
            </Link>
        </div>
        <div className="logout_con_PC101">
          <Link to="/login">
            <button className="logoutAndDel_btn_PC101" onClick={handleLogout}>
              Log Out
            </button>
          </Link>
          <br />
          <button className="logoutAndDel_btn_PC101" onClick={handleDelete}>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;