const express = require("express");
const dbConeection = require("./config/db");
const routes = require("./routes/employees");
const routes = require("./routes/cuts");
const routes = require("./routes/assign");
const routes = require("./routes/notifications");
const routes = require("./routes/status");
const routes = require("./routes/track");
const routes = require("./routes/home");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({orgin:true,credentials:true}));

//DB connection
dbConeection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => res.send("Hello World"));

app.use("/api/employees",routes);
app.use("/api/cuts",routes);
app.use("/api/assign",routes);
app.use("/api/assign",routes);
app.use("/api/notifications",routes);
app.use("/api/status",routes);
app.use("/api/track",routes);
app.use("/api/home",routes);

const PORT = 3000;

app.listen(PORT,() => console.log(`Server Running On PORT ${PORT}`)); 