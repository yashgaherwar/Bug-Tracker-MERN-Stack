const express = require('express');
const connectDB = require('./config/db.js');
const cors = require("cors");
const app = express();
app.use(cors());
//require("dotenv").config({ path: "../config.env" });

// Connect Database
connectDB();

// app.use(cors());
// app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: false }));

// Initialize Middleware
app.use(express.json());

// Bring in Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bugs', require('./routes/bugs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
