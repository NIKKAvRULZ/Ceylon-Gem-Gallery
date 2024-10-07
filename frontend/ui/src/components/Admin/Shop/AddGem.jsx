import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AddGem.css';

const AddGem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cut: '',
    Shape: '',
    Facets: '',
    Proportions: '',
    Appearance: '',
    price: '',
    imageUrl: null // For handling file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'name') {
      // Regular expression to allow only letters and spaces
      const lettersOnly = /^[A-Za-z\s]*$/;

      if (!lettersOnly.test(value)) {
        alert('Name should only contain letters and spaces.');
        return; // Prevent updating the state with invalid input
      }
    }

    if (name === 'price') {
      // Ensure price is a positive number
      if (value < 0 || isNaN(value)) {
        alert('Price should be a positive number.');
        return; // Prevent updating with invalid price
      }
    }

    setFormData({
      ...formData,
      [name]: name === 'imageUrl' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that price is a positive number
    if (formData.price <= 0 || isNaN(formData.price)) {
      alert('Please enter a valid positive price.');
      return; // Stop the form submission
    }

    // Prepare the data to send to the backend
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('cut', formData.cut);
    data.append('Shape', formData.Shape);
    data.append('Facets', formData.Facets);
    data.append('Proportions', formData.Proportions);
    data.append('Appearance', formData.Appearance);
    data.append('price', formData.price);
    data.append('imageUrl', formData.imageUrl);

    try {
      // Send the data to the server
      const response = await axios.post('http://localhost:3000/api/gemShop', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.msg); // Display success message

      // Reset the form fields
      setFormData({
        name: '',
        description: '',
        cut: '',
        Shape: '',
        Facets: '',
        Proportions: '',
        Appearance: '',
        price: '',
        imageUrl: null // Reset file input
      });

      // Generate the PDF after successful submission
      generatePDF();

    } catch (error) {
      console.error(error);
      alert('Error adding gem cut. Please try again.');
    }
  };

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo (Replace with actual logo URL or base64 image)
    const logoURL = '../../assets/logo.png'; // Adjust with your own logo path
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20); // Adjust logo position and size

    // Add Invoice Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Gem Cut Invoice", 14, 20);

    // Add Date and Invoice ID
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Invoice ID: ${Math.floor(Math.random() * 100000)}`, 14, 36);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 196, 40); // Horizontal line

    // Invoice Details Section (Customer, Company, etc.)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Company Name: Ceylon Gem Gallery", 14, 50);
    doc.text("Address: 123 Gem Street, Colombo, Sri Lanka", 14, 56);
    doc.text("Email: info@ceylongemgallery.com", 14, 62);
    doc.text("Phone: +94 76 039 4961", 14, 68);

    // Add some space before the table
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Gem Cut Details", 14, 80);

    // Table Columns and Rows   
    const columns = ["Property", "Details"];
    const rows = [
      ["Cut Name", formData.name],
      ["Description", formData.description],
      ["Shape", formData.Shape],
      ["Facets", formData.Facets],
      ["Proportions", formData.Proportions],
      ["Appearance", formData.Appearance],
    ];

    // Table Style
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 90,
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
      margin: { top: 90 },
    });

    // Add Image if available
    if (formData.imageUrl) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;
        doc.addImage(imgData, 'JPEG', 10, doc.autoTable.previous.finalY + 10, 50, 50); // Adjust positioning and size
        doc.save('gem-cut-invoice.pdf');
      };
      reader.readAsDataURL(formData.imageUrl);
    } else {
      doc.save('gem-cut-invoice.pdf');
    }
  };

  return (
    <div className="add-gem-container">
      <h2>Add New Gem Cut</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Gem Cut:</label>
          <textarea name="cut" value={formData.cut} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Shape:</label>
          <input type="text" name="Shape" value={formData.Shape} onChange={handleChange} />
        </div>

        <div>
          <label>Facets:</label>
          <input type="text" name="Facets" value={formData.Facets} onChange={handleChange} />
        </div>

        <div>
          <label>Proportions:</label>
          <input type="text" name="Proportions" value={formData.Proportions} onChange={handleChange} />
        </div>

        <div>
          <label>Appearance:</label>
          <input type="text" name="Appearance" value={formData.Appearance} onChange={handleChange} />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Image:</label>
          <input type="file" name="imageUrl" onChange={handleChange} />
        </div>

        <button type="submit">Add Gem</button>
      </form>
    </div>
  );
};

export default AddGem;
