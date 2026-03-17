const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User").default;

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb://localhost:27017/mernlogin")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server + MongoDB working 🚀");
});

// REGISTER API
app.post("/api/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// LOGIN API - 
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // ✅ THIS IS THE KEY FIX
    res.json({
      success: true,
      user: { 
        name: user.name, 
        email: user.email 
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// START SERVER
app.listen(5000, () => {
  console.log("🚀 Server started on http://localhost:5000");
});
