require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// Define User schema here
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ===== ROOT ROUTE =====
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ===== AUTH ROUTES =====

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) return res.status(400).send("User already exists");

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.send("Signup successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).send("Invalid password");

    res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ===== EXISTING ROUTES =====
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order saved!");
});

// ===== CONNECT TO MONGODB =====
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true, // enable TLS/SSL
    tlsAllowInvalidCertificates: false, // false for production
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
