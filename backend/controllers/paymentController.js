const stripe = require('stripe')('sk_test_51O2ZkNSCIg3CTOdnAgOBamnCrVisZ7NHNlitIve0aC1PJMeBDt4AUhCGBZ9EHbU1uHZa2pWsBw8SDMolGgv0VUhm00NBhiMnwC'); // Replace with your secret key
const User = require('../models/user');
const Subscription = require('../models/Subscription');

exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body; 
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let paymentUrl = '';
    if (plan === 'trial') {
      paymentUrl = 'https://buy.stripe.com/test_fZe2b5cto3CpcRG3cc'; 
    } else if (plan === 'halfYearly') {
      paymentUrl = 'https://buy.stripe.com/test_fZe3f90KGc8V9Fu6op'; 
    } else if (plan === 'yearly') {
      paymentUrl = 'https://buy.stripe.com/test_fZe02Xdxs6OB5pe28a'; 
    }

    await Subscription.create({
      userId,
      plan,
      status: 'pending',
    });

    res.json({ paymentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating payment link' });
  }
};
