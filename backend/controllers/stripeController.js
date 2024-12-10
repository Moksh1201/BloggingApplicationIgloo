const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key
const Subscription = require('../models/Subscription'); // Subscription model
const User = require('../models/user'); // User model

// Stripe webhook handler
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    // Construct event to validate the webhook
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Find the subscription using the Stripe session ID
      const subscription = await Subscription.findOne({ stripeSessionId: session.id });

      if (subscription) {
        // Update subscription status to 'active' upon successful payment
        subscription.status = 'active';
        await subscription.save();

        // Update user to indicate premium status
        await User.findByIdAndUpdate(subscription.userId, { isPremium: true });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

// Create checkout session for payment
exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body; // Get the selected plan from the request
  const userId = req.user.id; // Get authenticated user's ID

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Define the product and price based on the selected plan
    let lineItem = {};
    let priceId = '';

    // Define prices for different plans (example amounts)
    if (plan === 'trial') {
      priceId = process.env.STRIPE_TRIAL_PRICE_ID;
    } else if (plan === 'halfYearly') {
      priceId = process.env.STRIPE_HALF_YEARLY_PRICE_ID;
    } else if (plan === 'yearly') {
      priceId = process.env.STRIPE_YEARLY_PRICE_ID;
    } else {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.HOST_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.HOST_URL}/cancel`,
    });

    // Save the session details into the subscription collection
    const subscription = await Subscription.create({
      userId,
      plan,
      status: 'pending',
      stripeSessionId: session.id, // Store the session ID
    });

    // Return the payment URL to the frontend for redirection
    res.json({ paymentUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Error generating payment link' });
  }
};
