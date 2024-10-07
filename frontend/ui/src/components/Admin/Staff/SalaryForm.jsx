import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SalaryForm.css'; // Import the new CSS file

const SalaryForm = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState({
    bonus: 0,
    overtime: 0,
    additionalCosts: 0,
    month: "",
    date: "",
    year: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch staff list from the backend
    axios.get("http://localhost:3000/api/staff/")
      .then((res) => setStaffList(res.data.users))
      .catch((error) => console.error("Error fetching staff list:", error));
  }, []);

  const handleSelectChange = (e) => {
    const empID = e.target.value;
    const staff = staffList.find((s) => s.empID === empID);
    setSelectedStaff(staff);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryDetails({ ...salaryDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const salaryData = {
      empID: selectedStaff.empID,
      name: selectedStaff.name,
      month: salaryDetails.month,
      date: salaryDetails.date,
      year: salaryDetails.year,
      basicSalary: selectedStaff.basicSalary,
      bonus: salaryDetails.bonus,
      overtime: salaryDetails.overtime,
      additionalCosts: salaryDetails.additionalCosts,
    };

    console.log("Submitting salary data:", salaryData); // Log the data for debugging

    axios.post("http://localhost:3000/salary/add", salaryData)
      .then(() => {
        navigate("/Admin/salary-list");
      })
      .catch((error) => {
        console.error("Error submitting salary data:", error);
      });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="salary-form-container">
      <h2 className="salary-form-title">Salary Form</h2>
      <form onSubmit={handleSubmit} className="salary-form">
        <div className="salary-form-field">
          <label htmlFor="staff-select" className="salary-form-label">Select Staff</label>
          <select id="staff-select" className="salary-form-select" onChange={handleSelectChange}>
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.empID} value={staff.empID}>
                {staff.name} (ID: {staff.empID})
              </option>
            ))}
          </select>
        </div>

        {selectedStaff && (
          <>
            <p className="salary-form-basic-salary">Basic Salary: {selectedStaff.basicSalary}</p>

            <div className="salary-form-field">
              <label htmlFor="month" className="salary-form-label">Month</label>
              <select
                id="month"
                name="month"
                className="salary-form-select"
                value={salaryDetails.month}
                onChange={handleChange}
                required
              >
                <option value="">Select Month</option>
                {monthNames.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="salary-form-field">
              <label htmlFor="date" className="salary-form-label">Date</label>
              <select
                id="date"
                name="date"
                className="salary-form-select"
                value={salaryDetails.date}
                onChange={handleChange}
                required
              >
                <option value="">Select Date</option>
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="salary-form-field">
              <label htmlFor="year" className="salary-form-label">Year</label>
              <select
                id="year"
                name="year"
                className="salary-form-select"
                value={salaryDetails.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={2024 + index} value={2024 + index}>
                    {2024 + index}
                  </option>
                ))}
              </select>
            </div>

            <div className="salary-form-field">
              <label htmlFor="bonus" className="salary-form-label">Bonus($)</label>
              <input
                type="number"
                id="bonus"
                name="bonus"
                className="salary-form-input"
                value={salaryDetails.bonus}
                onChange={handleChange}
              />
            </div>

            <div className="salary-form-field">
              <label htmlFor="overtime" className="salary-form-label">Overtime($)</label>
              <input
                type="number"
                id="overtime"
                name="overtime"
                className="salary-form-input"
                value={salaryDetails.overtime}
                onChange={handleChange}
              />
            </div>

            <div className="salary-form-field">
              <label htmlFor="additionalCosts" className="salary-form-label">Additional Costs ($)</label>
              <input
                type="number"
                id="additionalCosts"
                name="additionalCosts"
                className="salary-form-input"
                value={salaryDetails.additionalCosts}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="salary-form-submit">Submit Salary</button>
          </>
        )}
      </form>
    </div>
  );
};

export default SalaryForm;
