const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripeSessionId: { type: String, required: true }, // Store the Stripe session ID for reference
  plan: { type: String, required: true }, // e.g., 'trial', 'halfYearly', 'yearly'
  status: { type: String, required: true }, // e.g., 'active', 'cancelled', 'pending'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
