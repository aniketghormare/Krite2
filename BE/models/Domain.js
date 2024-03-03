
const mongoose = require('mongoose');


const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  type: {
    type: String,
    required: true,

  },
  userID: {
    type: String,
    required: true,

  }
}, {
  versionKey: false
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
