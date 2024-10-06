import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./paymentform.css"; // CSS for form

const UpdatePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/costpayroute/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log("Error fetching payment:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "cardNo":
        // Allow only digits and max length of 16 for card number
        if (/^\d{0,16}$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "cardHName":
      case "city":
        // Allow only letters and spaces for card holder name and city (no digits)
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "district":
        // Ensure amount starts with $ and followed by numbers
        if (/^\$\d*\.?\d{0,2}$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "postalCode":
        // Allow only digits and max length of 5 for postal code
        if (/^\d{0,5}$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      case "cvc":
        // Allow only digits and max length of 3 for CVC
        if (/^\d{0,3}$/.test(value)) {
          setForm({ ...form, [name]: value });
        }
        break;

      default:
        setForm({ ...form, [name]: value });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/costpayroute/${id}`, form)
      .then(() => navigate("/Admin/payments"))
      .catch((err) => console.log("Error updating payment:", err));
  };

  // Get current year and month for the min attribute (future months only)
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-padded

  return (
    <div className="form-container">
      <h2>Update Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Card Holder Name:</label>
        <input
          type="text"
          name="cardHName"
          value={form.cardHName}
          onChange={handleChange}
          required
          placeholder="Enter card holder name"
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
          placeholder="Enter amount (e.g., $100)"
          pattern="^\$\d+(\.\d{1,2})?$"
          title="Amount must start with '$' followed by a number"
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
          pattern="\d{5}" // Enforce exactly 5 digits
          title="Postal code must be 5 digits"
          placeholder="Enter 5-digit postal code"
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
          min={`${currentYear}-${currentMonth}`} // Restrict to future months
        />

        <label>CVC:</label>
        <input
          type="password" // Show CVC as dots
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

export default UpdatePayment;
