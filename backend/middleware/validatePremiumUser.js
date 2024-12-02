const validatePremiumUser = (req, res, next) => {
    const user = req.user; // Assume user is added to req after auth
  
    if (!user || !user.isPremium) {
      return res.status(403).json({ error: 'Premium access required' });
    }
  
    next();
  };
  
  module.exports = { validatePremiumUser };
  