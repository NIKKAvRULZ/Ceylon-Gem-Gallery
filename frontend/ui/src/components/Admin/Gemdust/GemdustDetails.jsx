import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Gemdust from "../Gemdust/gemdust"; 
import './GemDustDetails.css';

const URL = "http://localhost:3000/gemdust"; // Change this to your actual backend URL

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching gem dust details:", error);
  }
};

function GemdustDetails() {
  const [gemdust, setGemdust] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.gemdusts) {
        setGemdust(data.gemdusts);
      }
    });
  }, []);

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png"; // Replace with actual logo URL or base64
    doc.addImage(logoURL, "PNG", 170, 10, 20, 20); // Adjust logo position and size

    // Add Company Name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20); // Adjust company name

    // Add Address and Contact Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 14, 30); // Adjust address
    doc.text("Email: contact@company.com", 14, 36); // Adjust email
    doc.text("Phone: +71 283 789", 14, 42); // Adjust phone number

    // Add Document Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Gem Dust Details Report", 14, 55);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60); // Horizontal line

    // Table Columns and Data
    const columns = ["Gem Type", "Weight (g)", "Quality", "Price", "Purity (%)", "Date"];
    const rows = gemdust.map(item => [
      item.gemtypes,
      item.weight,
      item.quality,
      item.price,
      item.purity,
      new Date(item.date).toLocaleDateString() 
    ]);

    // Table Style Configuration
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 70, // Start below the divider
      styles: {
        fontSize: 12,
        cellPadding: 3,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [22, 160, 133], // Color for table header
        textColor: [255, 255, 255], // White text
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Light grey for table body
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220], // Alternate row color
      },
    });

    // Save PDF
    doc.save("gem_dust_details_report.pdf");
  };

  if (!gemdust || gemdust.length === 0) {
    return <p>No Gem Dust data available.</p>;
  }

  return (

    // <div>
      
    <div className="gemdust-system-details-container">
      <h1 className="gemdust-system-title">Gem Dust Details</h1>

      <button onClick={generatePDF} className="gemdust-system-pdf-button">
        Generate PDF Report
      </button>

      <div className="gemdust-system-list">
        {gemdust.map((gemdustItem, i) => (
          <div key={gemdustItem._id || i} className="gemdust-system-item">
            {/* Assuming your backend serves images from /uploads folder */}
            <img 
              src={`http://localhost:3000/${gemdustItem.image}`} // Ensure you concatenate with backend URL
              alt={`${gemdustItem.gemtypes} image`} 
              className="gemdust-system-image"
            />
            <Gemdust gemdust={gemdustItem} />
          </div>
        ))}
      </div>
    </div>
    
    // </div>
  );
}

export default GemdustDetails;
