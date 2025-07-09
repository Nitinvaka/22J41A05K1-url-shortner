// routes.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Create new short URL
router.post('/shorturls', controller.createShortUrl);

// Redirect to long URL
router.get('/:shortcode', controller.redirectToLongUrl);

// Analytics of short URL
router.get('/shorturls/:shortcode', controller.getShortUrlStats);

module.exports = router;
