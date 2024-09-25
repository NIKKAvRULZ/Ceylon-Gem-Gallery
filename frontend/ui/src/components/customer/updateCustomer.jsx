import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './InsertCus.css';

function UpdateCustomer() {
    const [customer, setCustomers] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:3000/api/customer/${id}`)
        .then((res) => {
            setCustomers({
                Fname: res.data.Fname,
                Lname: res.data.Lname,
                Email: res.data.Email,
                Password: res.data.Password,
            });
        })
        .catch((err) => {
            console.log("Error from Update customer", err);
        });
    }, [id]);

    const onChange = (e) => {
        console.log(e.target.value)
        setCustomers({ ...customer, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            Fname: customer.Fname,
            Lname: customer.Lname,
            Email: customer.Email,
            Password: customer.Password,
        };

        axios
            .put(`http://localhost:3000/api/customer/${id}`, data)
            .then((res) => {
                navigate(`/showdetails/${id}`);
            })
            .catch((err) => {
                console.log("Error in Update");
            });
    };

    return (
        <div>
            <div className='cont'>
                <Link to="/" className="simple-button-link">Show Employee List</Link>
            </div>

            <div className="form-container">
                <form noValidate onSubmit={onSubmit} className="form">
                    <label htmlFor="first-name" className="form-label">First Name:</label>
                    <input 
                        type="text" 
                        id="first-name" 
                        name="Fname" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Fname} 
                    />
                    <br/>

                    <label htmlFor="last-name" className="form-label">Last Name:</label>
                    <input 
                        type="text" 
                        id="last-name" 
                        name="Lname" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Lname} 
                    />
                    <br/>

                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="Email" 
                        className="form-input" 
                        onChange={onChange} 
                        value={customer.Email}
                    />
                    <br/>

                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="Password" 
                        className="form-input" 
                        onChange={onChange}
                        value={customer.Password} 
                    />
                    <br/>

                    <button type="submit" className="form-button">Update Customer</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCustomer;
