import { Link } from "react-router-dom";

const AdminPaymentManagement = () => {
    return ( 
        <div className="home-container-home">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="/Admin/AddGemDust" className="home-card">
              <div className="card-content">
                <h3>Add GemDust</h3>
              </div>
            </Link>

            <Link to="/Admin/GemDustDetails" className="home-card">
              <div className="card-content">
                <h3>GemDust Details</h3>
              </div>
            </Link>

            <Link to="/User/UserHome" className="home-card">
              <div className="card-content">
                <h3>User Home</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
     );
}
 
export default AdminPaymentManagement;