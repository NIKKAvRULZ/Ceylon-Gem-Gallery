import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./update.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/customer");
        setCustomers(res.data);
      } catch (error) {
        console.log("Error fetching customer details", error);
      }
    };

    fetchCustomers();
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3000/api/customer/${id}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer._id !== id));
      })
      .catch((err) => {
        console.log("Delete error", err);
      });
  };

  // Function to export the table data to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
  
    const logoURL = "../../assets/logo.png"; // Adjust with your own logo path
    doc.addImage(logoURL, "PNG", 170, 10, 20, 20);
  
    // Add Invoice Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Customer List", 14, 22);
  
    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(14, 30, 196, 30); // Horizontal line
  
    const tableColumn = ["#", "First Name", "Last Name", "Email", "Password"];
    const tableRows = [];
  
    customers.forEach((customer, index) => {
      const customerData = [
        index + 1, // Row index
        customer.Fname || "N/A",
        customer.Lname || "N/A",
        customer.Email || "N/A",
        customer.Password || "N/A",
      ];
      tableRows.push(customerData);
    });
  
    // Auto-table for PDF with custom styling
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40, // Start position of the table
      styles: {
        fontSize: 10,            // Font size for the table content
        cellPadding: 3,          // Padding inside table cells
        halign: 'center',        // Center align text in all cells
        valign: 'middle',        // Vertically center the text
        lineWidth: 0.2,          // Table border line width
        lineColor: [0, 0, 0],    // Border color
        font: "helvetica",       // Font family
      },
      headStyles: {
        fillColor: [62, 146, 99], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontSize: 12,               // Font size for header
        fontStyle: "bold",          // Bold header text
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Alternate row background color
      },
      margin: { top: 40 }, // Top margin for the table
    });
  
    doc.save("customer-list.pdf"); // Save the PDF
  };
  

  return (
    <div className="con">
      <div className="customer-container">
        {/* Back link */}
        <div>
          <br />
          <Link to="/" className="back-link">
            Back to main
          </Link>
        </div>

        {/* Customers Details */}
        <br />
        <div>
          <h1 className="customer-title">Customer Details</h1>
          <button
            className="btn btn-outline-choose"
            onClick={() => navigate("/admin/addCustomer")}
          >
            Add Customers
          </button>
          <button className="btn btn-outline-choose" onClick={exportPDF}>
            Export to PDF
          </button>{" "}
          {/* Export button */}
          <p className="customer-description">
            This is the full list of customers:
          </p>
          <hr className="customer-divider" />
          <br />
        </div>

        {/* Table displaying customer details */}
        <div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="6">No customers found!</td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={customer._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{customer.Fname || "N/A"}</td>
                    <td>{customer.Lname || "N/A"}</td>
                    <td>{customer.Email || "N/A"}</td>
                    <td>{customer.Password || "N/A"}</td>
                    <td>
                      <Link
                        to={`/Admin/updatecustomerdetails/${customer._id}`}
                        className="edit-link"
                      >
                        Edit
                      </Link>
                      <button
                        className="edit-link"
                        onClick={() => onDeleteClick(customer._id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "red",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
