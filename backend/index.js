const express = require("express");
const app = express();
app.get("/",(req,res) => console.log("Hello Server is Running.."));
const PORT = 3000;

app.listen(PORT,() => console.log(`Server Running On PORT ${PORT}`));