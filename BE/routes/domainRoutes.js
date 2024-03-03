
const express = require('express');
const domainrouter = express.Router();
const domainController = require('../controllers/domainController');

domainrouter.get('/domains', domainController.getAllDomains);


module.exports = domainrouter;
