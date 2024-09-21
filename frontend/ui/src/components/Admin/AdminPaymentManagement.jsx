import { Link } from "react-router-dom";

const AdminPaymentManagement = () => {
    return ( 
        <div className="home-container-home">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="/Admin/costs" className="home-card">
              <div className="card-content">
                <h3>Cost Management</h3>
              </div>
            </Link>

            <Link to="/Admin/payments" className="home-card">
              <div className="card-content">
                <h3>Payment Management</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
     );
}
 
export default AdminPaymentManagement;