const stripe = require('stripe')('sk_test_51O2ZkNSCIg3CTOdnAgOBamnCrVisZ7NHNlitIve0aC1PJMeBDt4AUhCGBZ9EHbU1uHZa2pWsBw8SDMolGgv0VUhm00NBhiMnwC'); // Replace with your secret key
const User = require('../models/user');
const Subscription = require('../models/Subscription');

exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body; // Get the selected plan from the request
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Define the payment URL based on the selected plan
    let paymentUrl = '';
    if (plan === 'trial') {
      paymentUrl = 'https://buy.stripe.com/test_fZe2b5cto3CpcRG3cc'; // Replace with your actual link for monthly plan
    } else if (plan === 'halfYearly') {
      paymentUrl = 'https://buy.stripe.com/test_fZe3f90KGc8V9Fu6op'; // Update with your link for half-yearly plan
    } else if (plan === 'yearly') {
      paymentUrl = 'https://buy.stripe.com/test_fZe02Xdxs6OB5pe28a'; // Update with your link for yearly plan
    }

    // Save the session details into your subscription collection (this is optional depending on your needs)
    await Subscription.create({
      userId,
      plan,
      status: 'pending',
    });

    // Return the payment URL to the frontend for redirection
    res.json({ paymentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating payment link' });
  }
};
