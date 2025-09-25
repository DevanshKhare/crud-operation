const express = require("express");
const connectToDB = require("./config/db");
var cors = require('cors')
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectToDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I am up and working");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});