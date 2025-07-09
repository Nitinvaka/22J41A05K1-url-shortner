const db = require('./model');
const geoip = require('geoip-lite');
const { createShortcode, isValidUrl } = require('./utils');

// Create short URL
exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }
  const code = shortcode || createShortcode();
  if (db.urls[code]) {
    return res.status(409).json({ error: 'Shortcode already exists.' });
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + validity * 60000);

  db.urls[code] = { originalUrl: url, createdAt, expiry: expiresAt };
  db.analytics[code] = [];

  return res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiresAt.toISOString()
  });
};

// Redirect to original URL
exports.redirectToLongUrl = (req, res) => {
  const code = req.params.shortcode;
  const entry = db.urls[code];
  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found.' });
  }
  if (new Date() > new Date(entry.expiry)) {
    return res.status(410).json({ error: 'Short link has expired.' });
  }
  const geoInfo = geoip.lookup(req.ip);
  const clickInfo = {
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    location: geoInfo?.country || 'Unknown'
  };

  db.analytics[code].push(clickInfo);
  return res.redirect(entry.originalUrl);
};

// Get analytics
exports.getShortUrlStats = (req, res) => {
  const code = req.params.shortcode;
  const data = db.urls[code];
  if (!data) {
    return res.status(404).json({ error: 'Shortcode not found.' });
  }
  return res.json({
    originalUrl: data.originalUrl,
    createdAt: data.createdAt.toISOString(),
    expiry: data.expiry.toISOString(),
    clicks: db.analytics[code].length,
    clickDetails: db.analytics[code]
  });
};
