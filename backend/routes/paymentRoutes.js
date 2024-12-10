const express = require('express');
const { createCheckoutSession } = require('../controllers/stripeController');
const { stripeWebhook } = require('../controllers/stripeController');
const authenticate = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// POST route for creating checkout session
router.post('/create-checkout-session', authenticate, createCheckoutSession);

// POST route for Stripe webhook (ensure it uses raw body for signature validation)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
