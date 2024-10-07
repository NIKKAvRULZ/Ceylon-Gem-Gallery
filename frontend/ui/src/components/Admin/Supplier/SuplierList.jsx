import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./suplierlist.css";

const SuplierList = () => {
  const [supliers, setSupliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/sup")
      .then((res) => {
        if (res.data && res.data.users) {
          setSupliers(res.data.users);
        } else {
          console.error("Unexpected response structure:", res);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/sup/${id}`)
      .then(() => setSupliers(supliers.filter((user) => user._id !== id)))
      .catch((err) => console.log(err));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png"; // Replace with actual logo URL or base64
    doc.addImage(logoURL, "PNG", 170, 10, 20, 20); // Adjust logo position and size

    // Add Company Name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20); // Adjust company name

    // Add Address and Contact Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 14, 30); // Adjust address
    doc.text("Email: contact@company.com", 14, 36); // Adjust email
    doc.text("Phone: +71 283 789", 14, 42); // Adjust phone number

    // Add Document Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Supplier List Report", 14, 55);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60); // Horizontal line

    // Table Columns and Data
    const columns = ["Name", "Company", "Phone Number", "Email", "Address"];
    const rows = supliers.map((user) => [
      user.name,
      user.company,
      user.phoneNo,
      user.email,
      user.address,
    ]);

    // Table Style Configuration
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 70, // Start below the divider
      styles: {
        fontSize: 12,
        cellPadding: 3,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [22, 160, 133], // Color for table header
        textColor: [255, 255, 255], // White text
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Light grey for table body
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220], // Alternate row color
      },
    });

    // Save PDF
    doc.save("supplier_list_report.pdf");
  };

  const filteredSupliers = supliers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="suplier-list-container">
      <h2>Supplier List</h2>
      

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        className="search-suplier-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /><br/>
<Link to="/Admin/add-suplier">
        <button className="add-suplier-btn">Add New Supplier</button>
      </Link><br/>
      {/* Generate PDF Button */}
      <button className="generate-pdf-btn" onClick={generatePDF}>
        Generate PDF Report
      </button>

      <table className="suplier-table">
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
                <Link to={`/Admin/update-suplier/${user._id}`}>
                  <button className="update-suplier-btn">Update</button>
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
