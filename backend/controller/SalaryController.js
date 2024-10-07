const Salary = require("../models/Staff/SalaryModel");

// Add Salary
const addSalary = async (req, res) => {
  const { empID, name ,month ,date, year, basicSalary, bonus, overtime, additionalCosts } = req.body;

  // Convert to numbers
  const totalSalary = Number(basicSalary) + Number(bonus) + Number(overtime) + Number(additionalCosts);

  let salary;
  try {
    salary = new Salary({ empID, name, month, date, year, basicSalary: Number(basicSalary), bonus: Number(bonus), overtime: Number(overtime), additionalCosts: Number(additionalCosts), totalSalary });
    await salary.save();
  } catch (error) {
    return res.status(500).json({ message: "Unable to add salary", error: error.message });
  }

  return res.status(200).json({ message: "Salary added successfully", salary });
};

// Get all salary details and calculate total sums
const getAllSalaries = async (req, res) => {
  let salaries;
  try {
    salaries = await Salary.find();

    // Calculate the sum of basicSalary, bonus, overtime, additionalCosts, and totalSalary
    const totalBasicSalary = salaries.reduce((acc, salary) => acc + Number(salary.basicSalary), 0);
    const totalBonus = salaries.reduce((acc, salary) => acc + Number(salary.bonus), 0);
    const totalOvertime = salaries.reduce((acc, salary) => acc + Number(salary.overtime), 0);
    const totalAdditionalCosts = salaries.reduce((acc, salary) => acc + Number(salary.additionalCosts), 0);
    const totalSalaries = salaries.reduce((acc, salary) => acc + Number(salary.totalSalary), 0);

    return res.status(200).json({
      salaries,
      totalBasicSalary,
      totalBonus,
      totalOvertime,
      totalAdditionalCosts,
      totalSalaries,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving salaries", error: error.message });
  }
};

// Update Salary
const updateSalary = async (req, res) => {
  const { bonus, overtime, additionalCosts } = req.body;
  const id = req.params.id;

  let salary;
  try {
    salary = await Salary.findById(id);

    if (salary) {
      salary.bonus = Number(bonus);
      salary.overtime = Number(overtime);
      salary.additionalCosts = Number(additionalCosts);
      salary.totalSalary = salary.basicSalary + salary.bonus + salary.overtime + salary.additionalCosts;

      await salary.save();
      return res.status(200).json({ message: "Salary updated successfully", salary });
    } else {
      return res.status(404).json({ message: "Salary not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Unable to update salary", error: error.message });
  }
};

// Delete Salary
const deleteSalary = async (req, res) => {
  const id = req.params.id;

  let salary;
  try {
    salary = await Salary.findByIdAndDelete(id);
  } catch (err) {
    return res.status(500).json({ message: "Unable to delete salary" });
  }

  if (!salary) {
    return res.status(404).json({ message: "Salary not found" });
  }

  return res.status(200).json({ message: "Salary deleted successfully", salary });
};

module.exports = { addSalary, getAllSalaries, updateSalary, deleteSalary };
