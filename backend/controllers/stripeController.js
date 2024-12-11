const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const Subscription = require('../models/Subscription'); 
const User = require('../models/user'); 

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const subscription = await Subscription.findOne({ stripeSessionId: session.id });

      if (subscription) {
        subscription.status = 'active';
        await subscription.save();

        await User.findByIdAndUpdate(subscription.userId, { isPremium: true });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body; 
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let lineItem = {};
    let priceId = '';

    if (plan === 'trial') {
      priceId = process.env.STRIPE_TRIAL_PRICE_ID;
    } else if (plan === 'halfYearly') {
      priceId = process.env.STRIPE_HALF_YEARLY_PRICE_ID;
    } else if (plan === 'yearly') {
      priceId = process.env.STRIPE_YEARLY_PRICE_ID;
    } else {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

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

    const subscription = await Subscription.create({
      userId,
      plan,
      status: 'pending',
      stripeSessionId: session.id, 
    });

    res.json({ paymentUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Error generating payment link' });
  }
};
