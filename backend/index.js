const express = require("express");
const dbConeection = require("./config/db");

const workerRoutes = require('./routes/Woker/Worker');

// Routes
const employeeRoutes  = require("./routes/employees");
const cutsRoutes = require("./routes/Cut/cuts");
const assignRoutes = require("./routes/assign");
const notificationRoutes = require("./routes/notifications");

//Cost Routes
const paymentRoutes = require("./routes/Cost/costpayroute");
const costRoutes = require("./routes/Cost/costManagementRoutes");

const trackRoutes = require("./routes/track");
const homeRoutes = require("./routes/home");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({orgin:true,credentials:true}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.static('Images'))

//DB connection
dbConeection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => res.send("Hello World"));

app.use("/api/employees",employeeRoutes);
app.use("/api/cuts", cutsRoutes);
app.use("/api/assign", assignRoutes);
app.use("/api/notifications", notificationRoutes);
// app.use("/api/status", statusRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/home", homeRoutes);
app.use('/api/workers', workerRoutes);


//cost
app.use("/api/costpayroute", paymentRoutes);
app.use("/api/costmanagement", costRoutes);
const PORT = 3000;


app.listen(PORT,() => console.log(`Server Running On PORT ${PORT}`)); 