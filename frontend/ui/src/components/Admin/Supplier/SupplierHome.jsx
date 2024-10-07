import { Link } from "react-router-dom";

const SupplierHome = () => {
  return (
    <div className="home-container-home">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="/Admin/add-suplier" className="home-card">
              <div className="card-content">
                <h3>Add Supplier</h3>
              </div>
            </Link>

            <Link to="/Admin/suplier-list" className="home-card">
              <div className="card-content">
                <h3>Supplier List</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}

export default SupplierHome
