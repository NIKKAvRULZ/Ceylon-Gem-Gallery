const express = require("express");
const dbConnection = require("./config/db");

//charuka staff
const staffRoutes = require("./routes/staff/StaffRoutes");
const salaryRoutes = require("./routes/staff/SalaryRoutes");
const taskRoutes = require("./routes/staff/TaskRoutes"); // Import task routes


const workerRoutes = require('./routes/Woker/Worker');


const employeeRoutes = require("./routes/employees");

const cutsRoutes = require("./routes/Cut/cuts");
const assignRoutes = require("./routes/assign");
const notificationRoutes = require("./routes/notifications");


const paymentRoutes = require("./routes/Cost/costpayroute");
const costRoutes = require("./routes/Cost/costManagementRoutes");


const trackRoutes = require("./routes/trackOrder");
const homeRoutes = require("./routes/home");
const customerRoutes = require("./routes/Customer/customer"); // Correct the path

const shopRoutes = require("./routes/shop/gems");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.static('Images'));

// DB connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

// charuka staff
app.use("/api/staff", staffRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/salary", salaryRoutes);

app.use("/api/employees", employeeRoutes);
app.use("/api/cuts", cutsRoutes);
app.use("/api/assign", assignRoutes);
app.use("/api/customer", customerRoutes); // Make sure to use the correct plural
app.use("/api/notifications", notificationRoutes);

//Shop
app.use("/api/gemShop", shopRoutes);

app.use("/api/track", trackRoutes);
app.use("/api/home", homeRoutes);
app.use('/api/workers', workerRoutes);

// Cost routes
app.use("/api/costpayroute", paymentRoutes);
app.use("/api/costmanagement", costRoutes);

const PORT = 3000;


app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`));
