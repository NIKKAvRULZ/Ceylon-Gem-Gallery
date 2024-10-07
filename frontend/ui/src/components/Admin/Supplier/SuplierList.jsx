import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./suplierlist.css";

const SuplierList = () => {
  const [supliers, setSupliers] = useState([]); // Renamed state from 'sup' to 'supliers'
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const navigate = useNavigate(); // using useNavigate hook

  useEffect(() => {
    axios
      .get("http://localhost:3000/sup")
      .then((res) => {
        if (res.data && res.data.users) {
          setSupliers(res.data.users); // Updated set function name
        } else {
          console.error("Unexpected response structure:", res);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/sup/${id}`)
      .then(() => setSupliers(supliers.filter((user) => user._id !== id))) // Updated set function name
      .catch((err) => console.log(err));
  };

  // Handle search functionality
  const filteredSupliers = supliers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="suplier-list-container"> {/* Updated class name */}
      <h2>Suplier List</h2>
      <Link to="/Admin/add-suplier"> {/* Updated route */}
        <button className="add-suplier-btn">Add New Suplier</button> {/* Updated class name */}
      </Link>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        className="search-suplier-input" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />

      <table className="suplier-table"> {/* Updated class name */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSupliers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.company}</td>
              <td>{user.phoneNo}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <Link to={`/Admin/update-suplier/${user._id}`}> {/* Updated route */}
                  <button className="update-suplier-btn">Update</button> {/* Updated class name */}
                </Link>
                <button
                  className="delete-suplier-btn" 
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuplierList;
