const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Import route files
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import error handling middleware
//const { errorHandler, notFoundHandler } = require('./utils/errorHandling');

dotenv.config(); // Load environment variables from .env file

// Create an Express application

app.use((req, res, next) => {
    console.log('Middleware req headers:', req.headers);
    next();
  });
// Middleware
app.use(cors()); // Enable CORS for all routes

 // For parsing application/json

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve static files (e.g., for serving frontend assets if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Route handling

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// Handle 404 errors
// app.use(notFoundHandler);

// Handle general errors
//app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
