const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// env
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

// mongodb connection
async function connectToMongoDb() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}
connectToMongoDb();

// api routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.all("*", (req, res) => {
  res.status(405).json({ message: "Wrong Route" });
});

app.listen(port, () => {
  console.log(`backend server running on port - ${port}`);
});
