import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./paymentform.css"; // CSS for form
import jsPDF from "jspdf";

const InsertPayment = () => {
  const [form, setForm] = useState({
    cardHName: "",
    address: "",
    district: "",
    city: "",
    postalCode: "",
    cardNo: "",
    expireDate: "",
    cvc: "",
    paymentType: "Credit card",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "postalCode":
      case "cvc":
      case "cardNo":
        // Allow only numbers for postal code, CVC, and card number
        if (/^\d*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "cardHName":
      case "city":
        // Allow only letters (and spaces) for card holder name and city
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "address":
        // Allow letters, numbers, slashes, and spaces for the address
        if (/^[a-zA-Z0-9\s/]*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "district":
        // Ensure the input starts with a '$' followed by digits
        if (/^\$?\d*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      default:
        setForm({ ...form, [name]: value });
        break;
    }
  };

  // Function to validate the expiration date
  const isExpireDateValid = (expireDate) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Month is zero-indexed
    const [expireYear, expireMonth] = expireDate.split("-").map(Number);

    // Return true if the expiration date is in a future month
    return (
      expireYear > currentYear ||
      (expireYear === currentYear && expireMonth > currentMonth)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate expiration date before submitting
    if (!isExpireDateValid(form.expireDate)) {
      alert("Expiration date must be in a future month.");
      return; // Do not submit the form if validation fails
    }

    // Ensure amount starts with $ sign
    if (!form.district.startsWith("$") || isNaN(form.district.slice(1))) {
      alert("Amount must start with a '$' followed by a number.");
      return; // Do not submit the form if validation fails
    }

    // Send payment data to server
    axios
      .post("http://localhost:3000/api/costpayroute", form)
      .then((res) => {
        console.log("Payment added:", res.data);
        generatePDF(); // Generate the PDF receipt after successful submission
        navigate("/user"); // Redirect after submitting and generating PDF
      })
      .catch((err) => console.log("Error adding payment:", err));
  };

  // Generate PDF Receipt
  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Add Company Logo
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png";
    doc.addImage(logoURL, "PNG", 450, 30, 100, 100); // Bigger and better-positioned logo

    // Add Company Name and Contact Info
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 40, 80); // Adjusted position

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 40, 100);
    doc.text("Email: contact@company.com", 40, 115);
    doc.text("Phone: +71 286 789", 40, 130);

    // Document Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Receipt", 40, 170);

    // Divider Line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(40, 180, 560, 180); // Full-width divider line

    // Add Payment Details (Formatted in a table style)
    const paymentDetails = [
      { label: "Card Holder Name", value: form.cardHName },
      { label: "Address", value: form.address },
      { label: "Amount", value: form.district },
      { label: "City", value: form.city },
      { label: "Postal Code", value: form.postalCode },
      {
        label: "Card Number",
        value: form.cardNo.replace(/\d{12}(\d{4})/, "**** **** **** $1"),
      }, // Masked card number
      {
        label: "Expire Date",
        value: new Date(form.expireDate).toLocaleDateString(),
      },
      { label: "CVC", value: "***" }, // Masked CVC
      { label: "Payment Type", value: form.paymentType },
    ];

    // Render Payment Details
    let yPosition = 220;
    doc.setFontSize(14);
    paymentDetails.forEach((detail) => {
      doc.text(`${detail.label}:`, 40, yPosition);
      doc.text(detail.value, 200, yPosition);
      yPosition += 30; // More space between lines
    });

    // Add Thank You Message
    yPosition += 30;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.text("Thank you for your payment!", 40, yPosition);

    yPosition += 20;
    doc.text(
      "Ceylon Gem Gallery – Where tradition meets excellence.",
      40,
      yPosition
    );

    // Save the PDF
    doc.save("Payment_Receipt.pdf");
  };

  // Get current year and month for the min attribute
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed

  return (
    <div className="form-container">
      <h2>Insert Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Card Holder Name:</label>
        <input
          type="text"
          name="cardHName"
          value={form.cardHName}
          onChange={handleChange}
          required
          placeholder="Enter the card holder's name"
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Enter billing address (e.g., 123 Main St / Apt 4B)"
        />

        <label>Amount:</label>
        <input
          type="text"
          name="district"
          value={form.district}
          onChange={handleChange}
          required
          placeholder="Enter amount (e.g., $100)"
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
          placeholder="Enter city"
        />

        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          maxLength={5}
          required
          placeholder="Enter postal code (numbers only)"
        />

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNo"
          value={form.cardNo}
          onChange={handleChange}
          required
          maxLength={16} // Limit input to 16 digits
          pattern="\d{16}"
          title="Card number must be 16 digits"
          placeholder="Enter 16-digit card number"
        />

        <label>Expire Date:</label>
        <input
          type="month"
          name="expireDate"
          value={form.expireDate}
          onChange={handleChange}
          required
          min={`${currentYear}-${currentMonth}`} // Set minimum to the current month
        />

        <label>CVC:</label>
        <input
          type="text"
          name="cvc"
          value={form.cvc}
          onChange={handleChange}
          required
          maxLength={3} // Limit input to 3 digits
          pattern="\d{3}"
          title="CVC must be 3 digits"
          placeholder="Enter 3-digit CVC"
        />

        <label>Payment Type:</label>
        <select
          name="paymentType"
          value={form.paymentType}
          onChange={handleChange}
        >
          <option value="Credit card">Credit card</option>
          <option value="Debit card">Debit card</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsertPayment;
