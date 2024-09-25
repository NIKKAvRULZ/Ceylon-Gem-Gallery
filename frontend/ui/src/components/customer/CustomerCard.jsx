import './Card.css';

const CustomerCard = ({ customer, onDelete }) => {

  const handleDelete = () => {
    onDelete(customer._id);
  };

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
    </div>

  );
}

export default CustomerCard;
