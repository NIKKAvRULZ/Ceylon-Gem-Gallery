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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/costpayroute/${id}`, form)
      .then(() => navigate("/payments"))
      .catch((err) => console.log("Error updating payment:", err));
  };

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
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
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
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />

        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          required
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
