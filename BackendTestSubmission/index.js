const express = require('express');
const bodyParser = require('body-parser');
const logMiddleware = require('../LoggingMiddleware/logger');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(logMiddleware);

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`);
});
