const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
//dot config
dotenv.config({});
//mongo db connection
connectDB();
// rest object
const app = express();
// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000",
    withCredentials: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
// Include the user authentication routes
app.use("/auth", require("./routes/authRoutes"));
// Include the donor authentication routes
app.use("/donor", require("./routes/donorRoutes"));
app.use("/hospital", require("./routes/hospitalRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/bloodSample", require("./routes/bloodSampleRoutes"));
app.use("/inventory", require("./routes/inventoryRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode  on port number ${port}`
      .bgBlue.white
  );
});
