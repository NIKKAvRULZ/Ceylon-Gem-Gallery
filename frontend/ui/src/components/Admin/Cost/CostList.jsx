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
      .then((res) => {
        console.log(res.data); // Check if data is fetched properly
        setCosts(res.data);
      })
      .catch((err) => console.log("Error fetching costs:", err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/api/costmanagement/${id}`)
        .then(() => setCosts(costs.filter((cost) => cost._id !== id)))
        .catch((err) => console.log("Error deleting cost:", err));
    }
  };

  // Format month to display only year and month
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  };

  // Format numbers as currency (e.g., USD) with 2 decimal places
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Filter costs by month based on formatted month-year string
  const filteredCosts = costs.filter((cost) => {
    const formattedMonth = formatMonth(cost.month).toLowerCase();
    return formattedMonth.includes(searchTerm.toLowerCase());
  });

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png"; // Replace with actual logo URL or base64
    doc.addImage(logoURL, "png", 170, 10, 20, 20); // Adjust logo position and size

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
    doc.text("Cost Management Records", 14, 55);

    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60); // Horizontal line

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
      month: formatMonth(cost.month),
      validationCost: formatCurrency(cost.validationCost),
      cuttingCost: formatCurrency(cost.cuttingCost),
      salaryCost: formatCurrency(cost.salaryCost),
      additionalCost: formatCurrency(cost.additionalCost),
      totalCost: formatCurrency(
        Number(cost.validationCost) +
          Number(cost.cuttingCost) +
          Number(cost.salaryCost) +
          Number(cost.additionalCost)
      ),
      netProfit: formatCurrency(cost.netProfit),
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
        fillColor: [76, 175, 80], // Green for table header
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

      {/* If no costs are found */}
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
                <td>{formatMonth(cost.month)}</td>
                <td>{formatCurrency(cost.validationCost)}</td>
                <td>{formatCurrency(cost.cuttingCost)}</td>
                <td>{formatCurrency(cost.salaryCost)}</td>
                <td>{formatCurrency(cost.additionalCost)}</td>
                <td>
                  {formatCurrency(
                    Number(cost.validationCost) +
                      Number(cost.cuttingCost) +
                      Number(cost.salaryCost) +
                      Number(cost.additionalCost)
                  )}
                </td>
                <td>{formatCurrency(cost.netProfit)}</td>
                <td>
                  <Link to={`/Admin/update-cost/${cost._id}`}>
                    <button className="update-link">Update</button>
                  </Link>
                  <br></br>
                  <br />
                  <button
                    className="delete-btn-cost"
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
};

export default CostList;
