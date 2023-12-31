const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.js");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const app = express();
const dotenv = require("dotenv");

// Set up CORS middleware
app.use(cors());

// Load environment variables
dotenv.config({ path: "config/config.env" });

app.use(express.json()); // This includes bodyParser.json()
app.use(cookieParser());
app.use(fileUpload());

// Importing routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const paymentRoute = require("./routes/paymentRoute.js");

// Using routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// serving the frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfuly");
  });
}

// Error middleware
app.use(errorMiddleware);

module.exports = app;
