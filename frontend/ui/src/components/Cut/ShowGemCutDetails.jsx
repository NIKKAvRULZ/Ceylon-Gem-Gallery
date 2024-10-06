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
        customerId: '66f40ebee8c672d7700b6946' // Replace with actual customer ID
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
    
    // Add logo and title
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20);
    doc.setFontSize(22).setFont('helvetica', 'bold').text("Gem Cut Receipt", 14, 20);
    
    // Order set date and handover deadline
    const orderSetDate = new Date();
    const handOverDeadline = new Date(orderSetDate);
    handOverDeadline.setDate(handOverDeadline.getDate() + 2); // 2 days after order date
  
    // Estimated finish date (3 days after handover)
    const estimatedFinishDate = new Date(handOverDeadline);
    estimatedFinishDate.setDate(estimatedFinishDate.getDate() + 3); // 3 days after handover
  
    // Text details
    doc.setFontSize(12).setFont('helvetica', 'normal')
      .text(`Order Set Date: ${orderSetDate.toLocaleDateString()}`, 14, 30)
      .text(`Tracking ID: ${trackingID}`, 14, 36)
      .text(`Handover Gem By: ${handOverDeadline.toLocaleDateString()}`, 14, 42)
      .text(`Estimated Finish Date: ${estimatedFinishDate.toLocaleDateString()}`, 14, 48)
      .text(`Worker Name: ${workers.find(worker => worker._id === selectedWorker)?.name}`, 14, 54);
    
    // Set text color to green for handover instruction
    doc.setTextColor(0, 128, 0); // RGB for green
    doc.setFont('helvetica', 'italic')
      .text(`Please hand over the gem to the gem shop on or before ${handOverDeadline.toLocaleDateString()}.`, 14, 62)
      .text(`Estimated finish date is 3 days after the gem is handed over to the shop.`, 14, 68);
    
    // Reset text color to black
    doc.setTextColor(0, 0, 0);
  
    // Draw line separator
    doc.setDrawColor(0, 0, 0).setLineWidth(0.5).line(14, 72, 196, 72);
  
    // Table for gem cut details
    const columns = ["Property", "Details"];
    const rows = [
      ["Cut Name", gemCut.name],
      ["Description", gemCut.description],
      ["Shape", gemCut.Shape],
      ["Facets", gemCut.Facets],
      ["Proportions", gemCut.Proportions],
      ["Appearance", gemCut.Appearance],
    ];
  
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 78,
      styles: { fontSize: 12, cellPadding: 5 },
      headStyles: { fillColor: [65, 117, 88], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] }
    });
  
    // Save the PDF
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
