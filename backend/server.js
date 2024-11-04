// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error('MongoDB connection error:', err));

    // Example login route
app.post('/api/auth/login', (req, res) => {
    console.log("Login request received");  // Add this line
    const { username, password } = req.body;
    // Add logic to verify username and password
    if (username === 'test' && password === 'test') { // Sample check
        res.json({ token: 'sampleToken' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Example register route
app.post('/api/auth/register', (req, res) => {
    console.log("Register request received");  // Add this line
    const { username, password } = req.body;
    // Add logic to register the user
    res.json({ message: 'Registration successful' });
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
    app.get('/test', (req, res) => {
        res.json({ message: 'Test route working!' });
    });

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

