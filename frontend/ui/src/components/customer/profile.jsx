import React, { useState, useEffect } from "react";
import "./profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch("http://localhost:3000/auth/profile", {
        credentials: "include", // Include credentials for cookies
      });
      const json = await response.json();

      if (response.ok) {
        setCustomer(json);
      } else {
        console.error(json.message); // Log any error messages
      }
    };

    fetchCustomer();
  }, []);

  const [imagePreview, setImagePreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
  ); // Initial placeholder image

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Update the image preview
      };
      reader.readAsDataURL(input.files[0]); // Read the file as a data URL
    }
  };

  return (
    <div className="mcontainer_Pro101">
      <div className="container_Pro101">
        <div className="container2_Pro101">
          <div className="avatar-upload_Pro101">
          <div className="avatar-edit_Pro101">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => readURL(e.target)}
            />
            <label htmlFor="imageUpload">
              <span role="img" aria-label="edit">🖊</span> {/* Optional icon */}
            </label>
          </div>
            <div className="avatar-preview_Pro101">
              <div
                id="imagePreview"
                style={{ backgroundImage: `url(${imagePreview})` }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="pro_cusDetail_Pro101">
            {customer && (
              <p>
                {customer.Fname} {customer.Lname}
              </p>
            )}
          </h2>
        </div>

        <div className="containerButton_Pro101">
          <Link to="/User/profileCard">
            <button className="btn_Pro101">Personal Information</button>
          </Link>
          <br />
          <Link to="/my-orders">
            <button className="btn_Pro101">My Orders</button>
          </Link>
          <br />
          <Link to="/my-reviews">
            <button className="btn_Pro101">My Reviews</button>
          </Link>
          <br />
          <Link to="/add-items">
            <button className="btn_Pro101">Add Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
