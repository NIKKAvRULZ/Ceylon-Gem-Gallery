import { useState } from 'react';
import './AdminAddGemCuts.css'; // Import the CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

const AdminAddGemCuts = () => {
  // State to store form data
  const [gemCutData, setGemCutData] = useState({
    name: '',
    description: '',
    shape: '',
    facets: '',
    proportions: '',
    appearance: '',
  });

  const [image, setImage] = useState();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGemCutData({
      ...gemCutData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    const formData = new FormData();
    formData.append('name', gemCutData.name);
    formData.append('description', gemCutData.description);
    formData.append('imageUrl', image); // Append the image file
    formData.append('Shape', gemCutData.shape);
    formData.append('Facets', gemCutData.facets);
    formData.append('Proportions', gemCutData.proportions);
    formData.append('Appearance', gemCutData.appearance);
    
    try {
      const response = await axios.post('http://localhost:3000/api/cuts', formData);
      console.log('Gem cut added successfully:', response.data);

      // Reset the form
      setGemCutData({
        name: '',
        description: '',
        shape: '',
        facets: '',
        proportions: '',
        appearance: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding gem cut:', error);
    }
  };

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text("Gem Cut Invoice", 14, 20);

    // Add Date and Invoice ID (example)
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Invoice ID: ${Math.floor(Math.random() * 100000)}`, 14, 36);

    // Define the columns for the invoice table
    const columns = [
      "Property",
      "Details",
    ];

    // Map the form data into an array of arrays for the table rows
    const rows = [
      ["Cut Name", gemCutData.name],
      ["Description", gemCutData.description],
      ["Shape", gemCutData.shape],
      ["Facets", gemCutData.facets],
      ["Proportions", gemCutData.proportions],
      ["Appearance", gemCutData.appearance],
    ];

    // Add the table to the PDF using autoTable
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 50,
    });

    // Add image if available
    if (image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;
        doc.addImage(imgData, 'JPEG', 15, doc.autoTable.previous.finalY + 10, 50, 50); // Adjust positioning and size
        doc.save('gem-cut-invoice.pdf');
      };
      reader.readAsDataURL(image);
    } else {
      doc.save('gem-cut-invoice.pdf');
    }
  };

  return (
    <div className="Admin-container">
      <div className="Admin-card">
        <h2 className="Admin-card-title">Add Gem Cuts</h2><br />
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="cutName" className="label">Cut Name:</label>
            <input
              type="text"
              id="cutName"
              name="name"
              value={gemCutData.name}
              required
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutDescription" className="label">Cut Description:</label>
            <textarea
              id="cutDescription"
              name="description"
              value={gemCutData.description}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutImage" className="label">Cut Image URL:</label>
            <input
              type="file"
              id="cutImage"
              accept="image/png, image/jpeg"
              name="imageUrl"
              required
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutShape" className="label">Cut Shape:</label>
            <textarea
              id="cutShape"
              name="shape"
              value={gemCutData.shape}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutFacets" className="label">Cut Facets:</label>
            <textarea
              id="cutFacets"
              name="facets"
              value={gemCutData.facets}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutProportions" className="label">Cut Proportions:</label>
            <textarea
              id="cutProportions"
              name="proportions"
              value={gemCutData.proportions}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutAppearance" className="label">Cut Appearance:</label>
            <textarea
              id="cutAppearance"
              name="appearance"
              value={gemCutData.appearance}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-outline-choose float-right">Add Cut</button>
            <Link to={"/AdminGemCutHome/AdminGemCutList"} className="btn btn-outline-danger float-right">Back</Link>
          </div>
        </form>
        <br />
        <button className="btn btn-outline-primary" onClick={generatePDF}>Generate Invoice PDF</button>
      </div>
    </div>
  );
};

export default AdminAddGemCuts;
