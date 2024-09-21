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
    setForm({ ...form, [e.target.name]: e.target.value });
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

    axios
      .post("http://localhost:3000/api/costpayroute", form)
      .then((res) => {
        console.log("Payment added:", res.data);
        navigate("/user/shop"); // Redirect back link change it!!!!!!!!!!!
      })
      .catch((err) => console.log("Error adding payment:", err));
  };

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
          placeholder="Enter billing address"
        />

        <label>Amount:</label>
        <input
          type="text"
          name="district"
          value={form.district}
          onChange={handleChange}
          required
          pattern="^\$\d+(\.\d{1,2})?$"
          title="Please enter a valid amount starting with a $ sign"
          placeholder="Enter amount (e.g., $100.00)"
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
          required
          placeholder="Enter postal code"
        />

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNo"
          value={form.cardNo}
          onChange={handleChange}
          required
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
        />

        <label>CVC:</label>
        <input
          type="text"
          name="cvc"
          value={form.cvc}
          onChange={handleChange}
          required
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
