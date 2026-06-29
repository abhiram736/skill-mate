const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
<<<<<<< HEAD
=======
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
>>>>>>> 332d848 (Frontend and request feature updates)

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
<<<<<<< HEAD
=======
app.use("/api/users", userRoutes);
>>>>>>> 332d848 (Frontend and request feature updates)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("SkillMate API Running");
});
