import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./paymentform.css"; // CSS for form

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

    // Check the field and apply validation accordingly
    switch (name) {
      case "postalCode":
      case "cvc":
      case "cardNo":
        // Allow only numbers for district, postal code, CVC, and card number
        if (/^\d*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "cardHName":
      case "city":
        // Allow only letters (and spaces if needed) for card holder name and city
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
        // Allow only "$" followed by numbers
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

    axios
      .post("http://localhost:3000/api/costpayroute", form)
      .then((res) => {
        console.log("Payment added:", res.data);
        navigate("/Admin/payments"); // Redirect back link change it!!!!!!!!!!!
      })
      .catch((err) => console.log("Error adding payment:", err));
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
