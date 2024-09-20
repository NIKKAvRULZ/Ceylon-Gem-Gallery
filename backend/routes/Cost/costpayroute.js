const express = require("express");

const router = express.Router();

//getting the model to here
const Costs = require("../../models/Cost/costpay");

//test
router.get("/test",(req, res)=>res.send("Cost Route is working"));

router.post("/",(req,res)=>{
    Costs.create(req.body).then(()=>res.json({msg:"Costs added Succesdully"})).catch(()=>res.status(400).json({msg: "Costs adding failed"}));
});

//view
router.get("/",(req,res)=>{
    Costs.find()
    .then((costpays)=>res.json(costpays))
    .catch(()=>res.status(400).json({msg:"No Costs Found"}));

});
//get element by id

router.get("/:id",(req, res) => {
    Costs
    .findById(req.params.id)
    .then((costpays) => res.json(costpays))
    .catch(() => res.status(400).json({msg: "cannot find this Cost value"}));
});

//put method
router.put("/:id",(req,res) =>{
    Costs.findByIdAndUpdate(req.params.id,req.body).then(() =>
    res.json({msg:"Update Succesfull"})).catch(()=>res.status(400).json({msg:"Update Failed"}))
});

//delete
router.delete("/:id", (req, res)=> {
    Costs.findByIdAndDelete (req.params.id).then(()=>
        res
           .json({msg:"deleted Sucessfully"}))
           .catch(() => res.status(400).json({msg: "cannot be deleted"}))
});
module.exports = router;
