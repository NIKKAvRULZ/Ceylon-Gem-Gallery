import { useState } from "react";
import "./InsertCus.css";
import axios from "axios";
import { Link } from "react-router-dom";

const InsertCustomer = () => {
  //manage state
  const [customerData, setcustomerdata] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setcustomerdata({
      ...customerData,
      [name]: value,
    });
    console.log(customerData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/customer", customerData).then(() => {
      setcustomerdata({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
      });
    });
  };

  return (
    <div className="Mcontain_IC">
  <div>
    <Link to="/admin/customerList" className="simple-button-link_IC">
      Show Employee List
    </Link>
  </div>
  <div className="form-container_IC">
    <form onSubmit={handleSubmit} className="form_IC">
      <label htmlFor="first-name" className="form-label_IC">
        First Name:
      </label>
      <input
        type="text"
        id="first-name"
        name="Fname"
        className="form-input_IC"
        onChange={handleChange}
        value={customerData.Fname}
      />
      <br />

      <label htmlFor="last-name" className="form-label_IC">
        Last Name:
      </label>
      <input
        type="text"
        id="last-name"
        name="Lname"
        className="form-input_IC"
        onChange={handleChange}
        value={customerData.Lname}
      />
      <br />

      <label htmlFor="email" className="form-label_IC">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="Email"
        className="form-input_IC"
        onChange={handleChange}
        value={customerData.Email}
      />
      <br />

      <label htmlFor="password" className="form-label_IC">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="Password"
        className="form-input_IC"
        onChange={handleChange}
        value={customerData.Password}
      />
      <br />

      <button type="submit" className="form-button_IC">
        Submit
      </button>
    </form>
  </div>
</div>
  );
};

export default InsertCustomer;
