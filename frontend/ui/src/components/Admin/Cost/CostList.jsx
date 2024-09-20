import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./CostList.css"; // Make sure to import your CSS file here
const CostList = () => {
  const [costs, setCosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/costmanagement")
      .then((res) => setCosts(res.data))
      .catch((err) => console.log("Error fetching costs:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/costmanagement/${id}`)
      .then(() => setCosts(costs.filter((cost) => cost._id !== id)))
      .catch((err) => console.log("Error deleting cost:", err));
  };

  const filteredCosts = costs.filter((cost) =>
    cost.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo (Adjust logo URL or replace with base64 image if needed)
    const logoURL = 'https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png'; // Replace with the actual logo URL or base64
    doc.addImage(logoURL, "png", 170, 10, 20, 20); // Adjust logo position and size

    // Add Company Name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20); // Adjust the company name

    // Add Company Address and Contact Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 14, 30); // Adjust the company address
    doc.text("Email: contact@company.com", 14, 36); // Adjust the email
    doc.text("Phone: +71 283 789", 14, 42); // Adjust the phone number

    // Add Document Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Cost Management Records", 14, 55);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60); // Horizontal line to separate header

    // Table Columns and Data
    const columns = [
      { header: "Month", dataKey: "month" },
      { header: "Validation Cost", dataKey: "validationCost" },
      { header: "Cutting Cost", dataKey: "cuttingCost" },
      { header: "Salary Cost", dataKey: "salaryCost" },
      { header: "Additional Cost", dataKey: "additionalCost" },
      { header: "Total Cost", dataKey: "totalCost" },
      { header: "Net Profit", dataKey: "netProfit" },
    ];

    const data = filteredCosts.map((cost) => ({
      month: cost.month,
      validationCost: cost.validationCost,
      cuttingCost: cost.cuttingCost,
      salaryCost: cost.salaryCost,
      additionalCost: cost.additionalCost,
      totalCost:
        Number(cost.validationCost) +
        Number(cost.cuttingCost) +
        Number(cost.salaryCost) +
        Number(cost.additionalCost),
      netProfit: cost.netProfit,
    }));

    // Table Style Configuration
    doc.autoTable({
      columns,
      body: data,
      startY: 70,
      styles: {
        fontSize: 12,
        cellPadding: 3,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [76, 175, 80], // Change table header to green (RGB)
        textColor: [255, 255, 255], // White text for table header
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Light grey for table body
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220], // Alternate row color
      },
    });

    // Save PDF
    doc.save("cost_records.pdf");
  };

  return (
    <div className="cost-list-container">
      <h2 className="page-title">Cost Management</h2>

      {/* Add Cost Link */}
      <div className="actions-section">
        <Link to="/Admin/insert-cost" className="add-cost-link">
          + Add New Cost
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by month"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Download PDF Button */}
      <button className="download-btn" onClick={generatePDF}>
        Download PDF
      </button>

      {filteredCosts.length === 0 ? (
        <p className="no-data">No cost records found</p>
      ) : (
        <table id="costTable" className="cost-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Validation Cost</th>
              <th>Cutting Cost</th>
              <th>Salary Cost</th>
              <th>Additional Cost</th>
              <th>Total Cost</th>
              <th>Net Profit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCosts.map((cost, index) => (
              <tr key={index}>
                <td>{cost.month}</td>
                <td>{cost.validationCost}</td>
                <td>{cost.cuttingCost}</td>
                <td>{cost.salaryCost}</td>
                <td>{cost.additionalCost}</td>
                <td>
                  {Number(cost.validationCost) +
                    Number(cost.cuttingCost) +
                    Number(cost.salaryCost) +
                    Number(cost.additionalCost)}
                </td>
                <td>{cost.netProfit}</td>
                <td>
                  <Link to={`/Admin/update-cost/${cost._id}`}>
                    <button className="update-link">Update</button>
                  </Link>
                  <br></br>
                  <br></br>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(cost._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};``

export default CostList;