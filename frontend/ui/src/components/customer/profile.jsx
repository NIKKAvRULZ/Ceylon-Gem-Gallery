import React, { useState, useEffect } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

function Profile() {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            const response = await fetch('http://localhost:3000/api/customer');
            const json = await response.json();

            if (response.ok) {
                setCustomer(json);
            }
        };

        fetchCustomer();
    }, []);

    return (
        <div className='mcontainer_Profile1'>
            <div className='container_Profile1'>
                <div className='container_Profile1'>
                    <div className='profile_Profile1'>
                        <img src="../src/assets/profile.png" alt="no image" className='img_Profile1' />
                        <div className='overlay_Profile1'>
                            <input id="imgInp" type="file" />
                            <p>Change Picture</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className='pro_cusDetail_Profile1'>
                        {customer && customer.map((cust) => (
                            <p key={cust._id}>{cust.Fname} {cust.Lname}</p>
                        ))}
                    </h2>
                </div>
                <div className='containerButton_Profile1'>
                    <Link to="/profileList">
                        <button className='btn_Profile1'>Personal Information</button>
                    </Link>
                    <br />
                    <Link to="/my-orders">
                        <button className='btn_Profile1'>My Orders</button>
                    </Link>
                    <br />
                    <Link to="/my-reviews">
                        <button className='btn_Profile1'>My Reviews</button>
                    </Link>
                    <br />
                    <Link to="/add-items">
                        <button className='btn_Profile1'>Add Items</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;