import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./CostList.css";

const CostList = () => {
  const [costs, setCosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/costmanagement")
      .then((res) => {
        setCosts(res.data);
      })
      .catch((err) => console.log("Error fetching costs:", err));
  }, []);

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const filteredCosts = costs.filter((cost) => {
    const formattedMonth = formatMonth(cost.month).toLowerCase();
    return formattedMonth.includes(searchTerm.toLowerCase());
  });

  // Existing PDF generation function for cost records
  const generatePDF = () => {
    const doc = new jsPDF();
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png";

    doc.addImage(logoURL, "png", 170, 10, 20, 20);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: 123 Company Street, City, Country", 14, 30);
    doc.text("Email: contact@company.com", 14, 36);
    doc.text("Phone: +71 283 789", 14, 42);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Cost Management Records", 14, 55);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60);

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
        fillColor: [76, 175, 80],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220],
      },
    });

    doc.save("cost_records.pdf");
  };

  // New function to generate the balance sheet PDF
  const generateBalanceSheetPDF = () => {
    const doc = new jsPDF();
    const logoURL =
      "https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png";

    doc.addImage(logoURL, "png", 170, 10, 20, 20);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ceylon Gem Gallery", 14, 20);
    doc.setFontSize(12);
    doc.text("Balance Sheet", 14, 30);
    doc.text("Date: " + new Date().toLocaleDateString(), 14, 36);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 196, 40);

    // Assets Section
    doc.setFontSize(16);
    doc.text("Assets", 14, 50);
    doc.autoTable({
      startY: 55,
      head: [["Month", "Total Cost"]],
      body: filteredCosts.map((cost) => [
        formatMonth(cost.month),
        formatCurrency(
          Number(cost.validationCost) +
            Number(cost.cuttingCost) +
            Number(cost.salaryCost) +
            Number(cost.additionalCost)
        ),
      ]),
    });

    // Liabilities Section (assuming liabilities as 40% of total assets for simplicity)
    const totalAssets = filteredCosts.reduce(
      (acc, cost) =>
        acc +
        (Number(cost.validationCost) +
          Number(cost.cuttingCost) +
          Number(cost.salaryCost) +
          Number(cost.additionalCost)),
      0
    );
    const liabilities = totalAssets * 0.4;
    const equity = totalAssets - liabilities;

    doc.text("Liabilities", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      body: [["Total Liabilities", formatCurrency(liabilities)]],
    });

    // Equity Section
    doc.text("Equity", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      body: [["Total Equity", formatCurrency(equity)]],
    });

    doc.save("balance_sheet.pdf");
  };

  return (
    <div className="cost-list-container">
      <h2 className="page-title">Cost Management</h2>

      <div className="actions-section">
        <Link to="/Admin/insert-cost" className="add-cost-link">
          + Add New Cost
        </Link>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by month"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Existing Download PDF Button */}
      <button className="download-btn" onClick={generatePDF}>
        Download Cost Records PDF
      </button>

      {/* New Button for Balance Sheet PDF */}
      <button className="download-btn" onClick={generateBalanceSheetPDF}>
        Download Balance Sheet PDF
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
