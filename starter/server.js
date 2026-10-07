const express = require('express');
const path = require('path');

// Task 1: Create Express App instance and define PORT
const app = express();
const PORT = process.env.PORT || 3000;

// Task 2: Serve static files from the 'public' directory
// Handles CSS, images, and client-side assets automatically
app.use(express.static(path.join(__dirname, 'public')));

// Task 6 (Bonus): Express Router for organized API routing
const apiRouter = express.Router();

// Task 4: API endpoint returning current date/time as JSON
apiRouter.get('/time', (req, res) => {
  const now = new Date();
  res.json({
    currentTime: now.toLocaleTimeString(),
    currentDate: now.toLocaleDateString(),
    iso: now.toISOString()
  });
});

// Mount the API router on the '/api' prefix (GET /api/time)
app.use('/api', apiRouter);

// Task 3: Route Handlers for HTML Pages
// Home page (GET /)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// About page (GET /about)
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Contact page (GET /contact)
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Test route to verify the 500 error handler
app.get('/trigger-error', (req, res, next) => {
  next(new Error('Manual test error for Task 5'));
});

// Task 5: Error Handling Middleware
// 1. 404 Handler - placed after all defined routes to catch unmatched URLs
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 2. 500 Handler - must take exactly 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(` - GET  / (Home)`);
  console.log(` - GET  /about (About)`);
  console.log(` - GET  /contact (Contact)`);
  console.log(` - GET  /api/time (API Time)`);
  console.log(` - GET  /trigger-error (Test 500)`);
});