import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import AutoTable
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './SalaryList.css'; // Import the new CSS file

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get("http://localhost:3000/salary").then((res) => setSalaries(res.data.salaries));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/salary/${id}`).then(() => {
      setSalaries(salaries.filter((salary) => salary._id !== id));
    });
  };

  const calculateTotal = () => {
    return salaries.reduce((acc, salary) => acc + salary.totalSalary, 0);
  };

  // Function to generate and download the PDF with a table
  const generatePDF = (salary) => {
    const doc = new jsPDF();

    // Add the logo
    const logoURL = 'https://i.ibb.co/sPPq6j0/Crown-Jewelry-gems-Stones-Logo-2.png'; // Update with the correct path to your logo
    doc.addImage(logoURL, 'PNG', 170, 10, 20, 20); // Adjust positioning as needed

    // Add the document title
    doc.setFontSize(22).setFont('helvetica', 'bold').text("Salary Details Report", 14, 20);

    // Add some additional details like date
    const generatedDate = new Date().toLocaleDateString();
    doc.setFontSize(12).setFont('helvetica', 'normal')
      .text(`Generated Date: ${generatedDate}`, 14, 40);

    // Draw a line
    doc.setDrawColor(0, 0, 0).setLineWidth(0.5).line(14, 45, 196, 45);

    // Add user details in a table format
    const columns = ["Field", "Details"];
    const rows = [
      ["Name", salary.name],
      ["Employee ID", salary.empID],
      ["Month", salary.month],
      ["Date", salary.date],
      ["Year", salary.year],
      ["Basic Salary", salary.basicSalary],
      ["Bonus", salary.bonus],
      ["Overtime", salary.overtime],
      ["Additional Costs", salary.additionalCosts],
      ["Total Salary", salary.totalSalary],
    ];

    // Generate the table in the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 50, // Start the table below the title
      styles: {
        fontSize: 12,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [65, 117, 88], // Green color for the header
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Save the PDF with the user's name
    doc.save(`${salary.name}_Salary_Details.pdf`);
  };

  return (
    <div className="salary-list-container">
      <h2 className="salary-list-title">Salary List</h2>
      <table className="salary-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Month</th>
            <th>Date</th>
            <th>Year</th>
            <th>Basic Salary($)</th>
            <th>Bonus($)</th>
            <th>Overtime($)</th>
            <th>Additional Costs($)</th>
            <th>Total Salary($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary._id}>
              <td>{salary.name}</td>
              <td>{salary.empID}</td>
              <td>{salary.month}</td>
              <td>{salary.date}</td>
              <td>{salary.year}</td>
              <td>{salary.basicSalary}</td>
              <td>{salary.bonus}</td>
              <td>{salary.overtime}</td>
              <td>{salary.additionalCosts}</td>
              <td>{salary.totalSalary}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(salary._id)}>Remove</button><br></br>
                <br></br>
                <button className="paysheet-button" onClick={() => generatePDF(salary)}>Paysheet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="salary-total">Total Salary: $ {calculateTotal()}</h3>

      {/* Back Button */}
      <button className="salary-button-back-btn" onClick={() => navigate('/Admin/staff')}>Back to Staff List</button>
    </div>
  );
};

export default SalaryList;
