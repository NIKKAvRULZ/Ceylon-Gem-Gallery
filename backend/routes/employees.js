const express = require("express");

const router = express.Router();
const Employees = require("../models/employee");
const employee = require("../models/employee");

//test
router.get("/test",(req,res) => res.send("Employee Routes Working"));

router.post("/",(req,res)=>{
    Employees.create(req.body).then(()=>res.json({msg:"Employee Addedd Successfully"})).catch(()=>req.status(400).json({msg:"Employee Adding Faild"}));
});

router.get("/",(req,res) => {
    Employees.find().then((employees)=> res.json(employees)).catch(()=>res.status(400).json({msg:"No Employees Found"}));
});

router.get("/:id",(req,res)=>{
    employee.findById(req.params.id).then((employees)=> res.json(employees).catch(()=>res.status(400).json({msg:"cannot find this employee"})));
});
module.exports = router;