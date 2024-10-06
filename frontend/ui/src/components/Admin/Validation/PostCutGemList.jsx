import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './PostCutGemList.css'; // Ensure CSS file exists

const PostCutGemList = () => {
  const [postCutGems, setPostCutGems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/postcut");
        setPostCutGems(response.data.postCutGems);
      } catch (error) {
        console.error("Error fetching post-cut gems:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/postcut/${id}`);
      setPostCutGems(postCutGems.filter((gem) => gem._id !== id));
    } catch (error) {
      console.error("Error deleting gem:", error);
    }
  };

  const generatePDF = (postCutGem) => {
    const doc = new jsPDF();
  
    // Add Company Logo
    const logoURL = "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png"; // Replace with actual logo URL or base64
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
    doc.text("Post-Cut Gem Details Report", 14, 55);
  
    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60); // Horizontal line
  
    // Table Columns and Data
    const columns = ["Validation ID", "Gem Type", "Cut Type", "Weight (ct)", "Polish", "Price ($)", "Description"];
    const rows = [
      [
        postCutGem.validationid,
        postCutGem.gemType,
        postCutGem.cutType,
        postCutGem.weight,
        postCutGem.polish,
        postCutGem.price,
        postCutGem.description,
      ],
    ];
  
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
    doc.save("PostCutGemDetails.pdf");
  };
  

  return (
    <div className="postcut-gem-list-container">
      <h2>Post-Cut Gem List</h2>
      <div className="postcut-gem-list">
        {postCutGems.map((postCutGem) => (
          <div key={postCutGem._id} className="postcut-gem-item">
            <div className="gem-details">
              <p>Validation ID: {postCutGem.validationid}</p>
              <p>Gem Type: {postCutGem.gemType}</p>
              <p>Cut Type: {postCutGem.cutType}</p>
              <p>Weight: {postCutGem.weight}</p>
              <p>Polish: {postCutGem.polish}</p>
              <p>Price: {postCutGem.price}</p>
              <p>Description: {postCutGem.description}</p>
              {postCutGem.image && <img src={`http://localhost:3000/${postCutGem.image}`} alt="Gem" className="postcut-gem-image" />}
            </div>
            <div className="gem-actions">
              <Link to={`/Admin/validation-postcut/${postCutGem._id}`}>
                <button className="edit-button">Update</button>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(postCutGem._id)}>
                Delete
              </button>
              <button className="pdf-button" onClick={() => generatePDF(postCutGem)}>
                Generate PDF
              </button>
            </div>
            
          </div>
          
        ))}
        
      </div>
      <div className="gem-back">
              <Link to={`/Admin/validation/`}>
                <button className="edit-button">Back To Gem List</button>
              </Link>
              </div>
    </div>
  );
};

export default PostCutGemList;
