const validatePremiumUser = (req, res, next) => {
    const user = req.user; 
  
    if (!user || !user.isPremium) {
      return res.status(403).json({ error: 'Premium access required' });
    }
  
    next();
  };
  
  module.exports = { validatePremiumUser };
  