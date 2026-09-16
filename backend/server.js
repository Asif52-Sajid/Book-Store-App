const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Node.js to use Google & Cloudflare DNS to bypass local lookup errors

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Initialize App
dotenv.config();
const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Critical for letting Frontend talk to Backend

// 3. MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookstore";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// 4. User Model (Schema)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// 5. SIGNUP ROUTE
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create and Save to Database
        user = new User({ name, email, password });
        await user.save();

        console.log("👤 New User saved:", name);
        res.status(201).json({ success: true, user: { name, email } });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// 6. LOGIN ROUTE
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, user: { name: user.name, email: user.email } });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// 7. Start Server (Render-compatible port configuration)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));