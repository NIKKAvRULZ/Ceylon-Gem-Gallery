import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

  // Function to generate and download the PDF with a table
 
  
  const generatePDF = (user) => {
    const doc = new jsPDF();
  
    // Add the logo
    const logoURL = 'https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png'; // Update with the correct path to your logo
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20); // Adjust positioning as needed
  
    // Add the document title
    doc.setFontSize(22).setFont('helvetica', 'bold').text("Staff Details Report", 14, 20);
  
    // Add some additional details like date
    const generatedDate = new Date().toLocaleDateString();
    doc.setFontSize(12).setFont('helvetica', 'normal')
      .text(`Generated Date: ${generatedDate}`, 14, 40);
  
    // Draw a line
    doc.setDrawColor(0, 0, 0).setLineWidth(0.5).line(14, 45, 196, 45);
  
    // Add user details in a table format
    const columns = ["Field", "Details"];
    const rows = [
      ["Name", user.name],
      ["Employee ID", user.empID],
      ["Job Name", user.jobName],
      ["Email", user.email],
      ["Phone", user.phone],
      ["NIC", user.NIC],
      ["Basic Salary", user.basicSalary],
      ["Designation", user.designation]
    ];
  
    // Generate the table in the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 50, // Start the table below the title
      styles: {
        fontSize: 12,
        cellPadding: 5
      },
      headStyles: {
        fillColor: [65, 117, 88], // Green color for the header
        textColor: [255, 255, 255]
      },
      bodyStyles: {
        fillColor: [245, 245, 245]
      }
    });
  
    // Save the PDF with the user's name
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
            <th>NIC</th>
            <th>Basic Salary</th>
            <th>Designation</th>
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
              <td>{user.NIC}</td>
              <td>{user.basicSalary}</td>
              <td>{user.designation}</td>
              <td>

                
              <Link to={`/Admin/update-staff/${user._id}`}>
             <button className="edit-btn">Edit</button>
              </Link>

                <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                  Delete
                </button><br></br>
                <br></br>
                <Link to={`/Admin/task-assign/${user._id}`}>
                  <button className="assign-btn">Task Assign</button>
                </Link><br></br>
                <br></br>
                <button className="pdf-btn" onClick={() => generatePDF(user)}>
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
