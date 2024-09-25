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
    const fetchData = async () => {
      try {
        const cutResponse = await axios.get(`http://localhost:3000/api/cuts/${id}`);
        setGemCut(cutResponse.data);

        const workersResponse = await axios.get('http://localhost:3000/api/workers');
        setWorkers(workersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUseCut = async () => {
    if (!selectedWorker) {
      alert("Please select a worker.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/api/track`, {
        cutId: gemCut._id,
        workerId: selectedWorker,
        customerId: '66f4092670e8d00c1926d00b' // Replace with actual customer ID
      });

      setTrackingID(response.data.trackOrder.trackingID);
      alert(`Job assigned successfully! Tracking ID: ${response.data.trackOrder.trackingID}`);
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
    const logoURL = '../../assets/logo.png';
    
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20);
    doc.setFontSize(22).setFont('helvetica', 'bold').text("Gem Cut Receipt", 14, 20);
    
    const orderSetDate = new Date();
    const estimatedFinishDate = new Date(orderSetDate);
    estimatedFinishDate.setDate(estimatedFinishDate.getDate() + 2);

    doc.setFontSize(12).setFont('helvetica', 'normal')
      .text(`Order Set Date: ${orderSetDate.toLocaleDateString()}`, 14, 30)
      .text(`Tracking ID: ${trackingID}`, 14, 36)
      .text(`Estimated Finish Date: ${estimatedFinishDate.toLocaleDateString()}`, 14, 42)
      .text(`Worker Name: ${workers.find(worker => worker._id === selectedWorker)?.name}`, 14, 48);

    doc.setDrawColor(0, 0, 0).setLineWidth(0.5).line(14, 52, 196, 52);
    
    const columns = ["Property", "Details"];
    const rows = [
      ["Cut Name", gemCut.name],
      ["Description", gemCut.description],
      ["Shape", gemCut.Shape],
      ["Facets", gemCut.Facets],
      ["Proportions", gemCut.Proportions],
      ["Appearance", gemCut.Appearance],
    ];

    doc.autoTable({ head: [columns], body: rows, startY: 104, styles: { fontSize: 12, cellPadding: 5 }, headStyles: { fillColor: [65, 117, 88], textColor: [255, 255, 255] }, bodyStyles: { fillColor: [245, 245, 245] } });
    doc.save('gem-cut-receipt.pdf');
  };

  return (
    <div className="showGemCutDetails">
      <div className="header">
        <h1 className="title">Gem Cut Details</h1>
        <p className="subHead">This is the full detail of {gemCut.name}</p>
      </div>

      <div className="gemCutInfo">
        <img src={`http://localhost:3000/Cuts/${gemCut.imageUrl}`} alt={gemCut.name} className="gemImage" />
        <table className="table">
          <tbody>
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


        {trackingID && (
          <div className="tracking-info">
            <h3 className="header">Job Assigned!</h3>
            <p className="tracking-id"><strong>Tracking ID:</strong> {trackingID}</p>
          </div>
        )}

        <div className="workerSelection">
        <label htmlFor="workerSelect">Select Worker:</label>
        <select
          id="workerSelect"
          className="worker-select"
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
      </div>
      <div className="buttonContainer">
          <Link to={"/user/GemCutHome/CustomCut"} className="btn btn-outline-danger">Back</Link>
          <button 
            className="btn btn-outline-choose" 
            onClick={handleUseCut} 
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Use This Cut'}
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default ShowGemCutDetails;
