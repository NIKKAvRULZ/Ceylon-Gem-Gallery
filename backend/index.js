const express = require('express');
const dbConnection = require("./config/db");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require('dotenv');
dotenv.config();

//mihiran supplier
const supRoutes = require("./routes/Supplier/supRoutes");

//janidu gemdust
const router = require("./routes/Gemdust/gemdustRoutes");

//imashi validation
const UserRoutes = require("./routes/Validation/UserRoutes");
const PostCutRoutes = require("./routes/Validation/PostCutRoutes");

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

//user
const UserRouter = require('./routes/user'); // Adjust the path if needed



const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

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



//imashi 
app.use(cors());  // Use the specific CORS options
app.use(express.json());
app.use('/Images', express.static(path.join(__dirname, 'Images'))); // Serve static files
//janidu gemmdust
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/gemdust", router);

//imashi
app.use("/api/users", UserRoutes);
app.use("/api/postcut", PostCutRoutes); 

//mihiran supplier
app.use("/sup", supRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`));
