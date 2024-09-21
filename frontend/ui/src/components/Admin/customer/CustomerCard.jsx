import { useNavigate } from 'react-router-dom';
import './Card.css';

const CustomerCard = ({ customer, onDelete }) => {

  const navigate = useNavigate();

  const handleDelete = () => {
    if(confirm("Are you sure?")){
      onDelete(customer._id);
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/updatecustomerdetails/${customer._id}`);
  }

  // Create a hidden password representation with asterisks
  const hiddenPassword = '*'.repeat(customer.Password.length);

  return (
    <div className='mcontiner'>
      <h1>Profile</h1>
      <div className="email-container">
        <h3 className="email-label">Email</h3>
        <div className="email-content">
          <span className="email-text">{customer.Email}</span>
        </div>
      </div>
      <div className="email-container">
        <h3 className="email-label">Password</h3>
        <div className="email-content">
          <span className="email-text">{hiddenPassword}</span>
        </div>
      </div>
      <br />
      <h2>Personal Information</h2>
      <div className="email-container">
        <h3 className="email-label">First name</h3>
        <div className="email-content">
          <span className="email-text">{customer.Fname}</span>
        </div>
      </div>
      <div className="email-container">
        <h3 className="email-label">Last name</h3>
        <div className="email-content">
          <span className="email-text">{customer.Lname}</span>
        </div>
      </div>
      <br />
      <button className='btn btn-outline-choose' onClick={handleUpdate}>Update Customer</button>
      <button className='btn btn-outline-danger' onClick={handleDelete}>Delete Customer</button>
    </div>

  );
}

export default CustomerCard;
