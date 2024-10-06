import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the autotable plugin
import "./paymentlist.css"; // Importing the CSS file for styling
import autoTable from "jspdf-autotable";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/costpayroute")
      .then((res) => {
        setPayments(res.data); // Store the response data in the state
      })
      .catch((err) => {
        console.log("Error while getting data:", err);
      });
  }, []);

  // Delete payment with confirmation
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmed) {
      axios
        .delete(`http://localhost:3000/api/costpayroute/${id}`)
        .then(() => {
          setPayments(payments.filter((payment) => payment._id !== id));
          alert("Payment record deleted successfully.");
        })
        .catch((err) => console.log("Error deleting payment:", err));
    }
  };

  // Generate PDF for payment records
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Name
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20);

    // Add Company Address and Contact Info
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 14, 30);
    doc.text("Email: contact@company.com", 14, 36);
    doc.text("Phone: +71 286 789", 14, 42);

    // Add Document Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 14, 55);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60);

    // Define the columns dynamically (let autoTable handle widths)
    const columns = [
      { header: "No", dataKey: "no" },
      { header: "Card Holder Name", dataKey: "cardHName" },
      { header: "Address", dataKey: "address" },
      { header: "Amount", dataKey: "amount" },
      { header: "City", dataKey: "city" },
      { header: "Postal Code", dataKey: "postalCode" },
      { header: "Card Number", dataKey: "cardNo" },
      { header: "Expire Date", dataKey: "expireDate" },
      { header: "Payment Type", dataKey: "paymentType" },
    ];

    // Map payment data into an array for the table rows
    const data = payments.map((payment, index) => ({
      no: index + 1,
      cardHName: payment.cardHName,
      address: payment.address,
      amount: payment.district, // Is this correct? Should it be payment.amount?
      city: payment.city,
      postalCode: payment.postalCode,
      cardNo: payment.cardNo,
      expireDate: new Date(payment.expireDate).toLocaleDateString(),
      paymentType: payment.paymentType,
    }));

    // Add table to PDF using autoTable with better styles
    doc.autoTable({
      columns,
      body: data,
      startY: 70,
      styles: {
        fontSize: 10,
        cellPadding: 1, // Increased padding for better readability
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        overflow: "linebreak", // Allow content to wrap within cells
      },
      headStyles: {
        fillColor: [76, 175, 80], // light green for the header
        textColor: [255, 255, 255], // White text
        halign: "center", // Center align header text
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Light grey for the body
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220], // Alternating row color for better readability
      },
      columnStyles: {
        no: { halign: "center", cellWidth: "auto" }, // Center alignment for "No" column
        amount: { halign: "right", cellWidth: "auto" }, // Right-align for amount, auto width
        cardNo: { cellWidth: "auto" }, // Wider column for card number
        address: { cellWidth: "auto" }, // Adjust width for longer text like address
        expireDate: { halign: "center", cellWidth: "auto" }, // Center alignment for dates
        paymentType: { halign: "center", cellWidth: "auto" },
      },
    });

    // Save the PDF with a relevant name
    doc.save("payment-details-Ceylon-Gem-Gallery.pdf");
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter payments based on the search term
  const filteredPayments = payments.filter((payment) =>
    payment.cardHName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payment-list-container">
      <h2>Payment Details</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Card Holder Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/Admin/insert-payment")}
          className="payment-button"
        >
          Add Payment
        </button>

        {/* Add a button to download PDF */}
        <button onClick={generatePDF} className="update-button">
          Download PDF
        </button>
      </div>

      {filteredPayments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Card Holder Name</th>
              <th>Address</th>
              <th>Amount</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Card Number</th>
              <th>Expire Date</th>
              <th>Payment Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{payment.cardHName}</td>
                <td>{payment.address}</td>
                <td>{payment.district}</td>
                <td>{payment.city}</td>
                <td>{payment.postalCode}</td>
                <td>{payment.cardNo}</td>
                <td>{new Date(payment.expireDate).toLocaleDateString()}</td>
                <td>{payment.paymentType}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() =>
                      navigate(`/Admin/update-payment/${payment._id}`)
                    }
                  >
                    Update
                  </button>
                  <br />
                  <br />
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(payment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentList;
