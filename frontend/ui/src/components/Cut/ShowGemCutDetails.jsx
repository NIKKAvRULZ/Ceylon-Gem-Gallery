import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ShowGemCutDetails.css';

function ShowGemCutDetails() {
  const [gemCut, setGemCut] = useState({});
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingID, setTrackingID] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    // Fetch gem cut details
    axios.get(`http://localhost:3000/api/cuts/${id}`)
      .then((res) => {
        setGemCut(res.data);
      })
      .catch((error) => {
        console.log("Error getting gem cuts:", error);
      });

    // Fetch the list of available workers
    axios.get('http://localhost:3000/api/workers')
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((error) => {
        console.log("Error fetching workers:", error);
      });
  }, [id]);

  const handleUseCut = async () => {
    if (!selectedWorker) {
      alert("Please select a worker.");
      return;
    }

    setLoading(true);
    try {
      // Assign job using the selected worker and gem cut
      const response = await axios.post(`http://localhost:3000/api/track`, {
        cutId: gemCut._id,
        workerId: selectedWorker,
        customerId: '66ee8cc3f4cfe655dc12ce2d' // Replace with the actual customer ID
      });

      console.log("Job assigned response:", response.data);
      setTrackingID(response.data.trackOrder.trackingID);
      alert(`Job assigned successfully! Tracking ID: ${response.data.trackOrder.trackingID}`);
      
      // Generate PDF receipt
      generatePDF(response.data.trackOrder.trackingID);
    } catch (error) {
      console.error("Error assigning job:", error.response ? error.response.data : error.message);
      alert("There was an error assigning the job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (trackingID) => {
    const doc = new jsPDF();
    
    // Add Company Logo
    const logoURL = '../../assets/logo.png'; // Placeholder logo
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20); // Adjust logo position and size
    
    // Add Receipt Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Gem Cut Receipt", 14, 20);
    
    // Add Date and Tracking ID
    const orderSetDate = new Date();
    const estimatedFinishDate = new Date(orderSetDate);
    estimatedFinishDate.setDate(estimatedFinishDate.getDate() + 2); // Two days after the order

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order Set Date: ${orderSetDate.toLocaleDateString()}`, 14, 30);
    doc.text(`Tracking ID: ${trackingID}`, 14, 36);
    doc.text(`Estimated Finish Date: ${estimatedFinishDate.toLocaleDateString()}`, 14, 42);
    doc.text(`Worker Name: ${workers.find(worker => worker._id === selectedWorker)?.name}`, 14, 48); // Worker name

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 52, 196, 52); // Horizontal line
    
    // Receipt Details Section
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Company Name: Ceylon Gem Gallery", 14, 64);
    doc.text("Address: 123 Gem Street, Colombo, Sri Lanka", 14, 70);
    doc.text("Email: info@ceylongemgallery.com", 14, 76);
    doc.text("Phone: +94 76 039 4961", 14, 82);
    
    // Add some space before the table
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Gem Cut Details", 14, 94);
    
    // Table Columns and Rows
    const columns = ["Property", "Details"];
    const rows = [
      ["Cut Name", gemCut.name],
      ["Description", gemCut.description],
      ["Shape", gemCut.Shape],
      ["Facets", gemCut.Facets],
      ["Proportions", gemCut.Proportions],
      ["Appearance", gemCut.Appearance],
    ];
    
    // Table Style
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 104,
      styles: {
        fontSize: 12,
        cellPadding: 5,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [65, 117, 88],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220],
      },
      margin: { top: 104 },
    });

    // Save the PDF
    doc.save('gem-cut-receipt.pdf');
  };

  const TableItem = (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td colSpan="2" className="text-center">
              <img src={`http://localhost:3000/Cuts/${gemCut.imageUrl}`} alt={gemCut.name}/>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{gemCut.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td className="description-text">{gemCut.description}</td>
          </tr>
          <tr>
            <td>Shape</td>
            <td className="description-text">{gemCut.Shape}</td>
          </tr>
          <tr>
            <td>Facets</td>
            <td className="description-text">{gemCut.Facets}</td>
          </tr>
          <tr>
            <td>Proportions</td>
            <td className="description-text">{gemCut.Proportions}</td>
          </tr>
          <tr>
            <td>Appearance</td>
            <td className="description-text">{gemCut.Appearance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="showGemCutDetails">
      <div className="col-md-8 m-auto">
        <h1 className="title">Gem Cut Details</h1>
        <p className="subHead">This is the full detail of {gemCut.name}</p>
        <hr />
      </div>

      <div className="col-md-10 m-auto">{TableItem}</div>

      <div className="col-md-10 m-auto">
        <label htmlFor="workerSelect">Select Worker:</label>
        <select
          id="workerSelect"
          className="worker-select" // Unique class added here
          value={selectedWorker}
          onChange={(e) => setSelectedWorker(e.target.value)}
        >
          <option value="">Choose a worker</option>
          {workers.map(worker => (
            <option key={worker._id} value={worker._id}>
              {worker.name}
            </option>
          ))}
        </select>


        <br />
        <Link to={"/user/GemCutHome/CustomCut"} className="btn btn-outline-danger float-right">Back</Link>
        <button 
          className="btn btn-outline-choose float-right" 
          onClick={handleUseCut} 
          disabled={loading}
        >
          {loading ? 'Assigning...' : 'Use This Cut'}
        </button>
      </div>

      {trackingID && (
        <div className="tracking-info">
          <h3>Job Assigned!</h3>
          <p><strong>Tracking ID:</strong> {trackingID}</p>
        </div>
      )}
    </div>
  );
}

export default ShowGemCutDetails;
