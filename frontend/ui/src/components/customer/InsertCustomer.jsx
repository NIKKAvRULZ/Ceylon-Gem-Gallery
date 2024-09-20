import React, { useState } from 'react';
import './InsertCus.css';
import axios from "axios";

const InsertCustomer = () => {

    //manage state
    const [customerData, setcustomerdata] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
    });

    const handleChange = (e) => {
        const { name, value} = e.target;

        setcustomerdata({
            ...customerData,
            [name] : value,
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
    <div className='Mcontain'>
        <div class="form-container">
            <form onSubmit={handleSubmit} class="form">
                <label for="first-name" class="form-label">First Name:</label>
                <input 
                type="text" 
                id="first-name" 
                name="Fname" 
                class="form-input" 
                onChange={handleChange}
                value={customerData.Fname} />
                <br/>

                <label for="last-name" class="form-label">Last Name:</label>
                <input 
                type="text" 
                id="last-name" 
                name="Lname" 
                class="form-input" 
                onChange={handleChange}
                value={customerData.Lname} />
                <br/>

                <label for="email" class="form-label">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="Email" 
                class="form-input" 
                onChange={handleChange} 
                value={customerData.Email}/>
                <br/>

                <label for="password" class="form-label">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="Password" 
                class="form-input" 
                onChange={handleChange}
                value={customerData.Password} />
                <br/>

                <button type="submit" class="form-button">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default InsertCustomer
