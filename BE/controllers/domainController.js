
const Domain = require('../models/Domain');

exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


