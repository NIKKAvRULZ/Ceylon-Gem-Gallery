import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./stafflist.css";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/staff")
      .then((res) => setStaff(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/staff/${id}`)
      .then(() => setStaff(staff.filter((user) => user._id !== id)))
      .catch((err) => console.log(err));
  };

  // Function to generate and download the PDF
  const generatePDF = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Staff Details`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 20, 40);
    doc.text(`Employee ID: ${user.empID}`, 20, 50);
    doc.text(`Job Name: ${user.jobName}`, 20, 60);
    doc.text(`Email: ${user.email}`, 20, 70);
    doc.text(`Phone: ${user.phone}`, 20, 80);

    doc.save(`${user.name}_Details.pdf`);
  };

  // Filter staff based on search term
  const filteredStaff = staff.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="staff-list-container">
      <h2>Staff List</h2>
      <div className="actions-container">
        <Link to="/Admin/add-staff">
          <button className="add-staff-btn">Add New Staff</button>
        </Link>
        <Link to={`/Admin/show-task/`}>
          <button className="show-btn">Show Assigned Task</button>
        </Link>
      </div>
      
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Job Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.empID}</td>
              <td>{user.jobName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/Admin/updateee/${user._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>

                <Link to={`/Admin/task-assign/${user._id}`}>
                  <button className="assign-btn">Task Assign</button>
                </Link>
                <button className="pdf-btn" onClick={() => generatePDF(user)}>Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
