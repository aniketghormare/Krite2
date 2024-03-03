
const express = require('express');
const multer = require('multer');
const dnsrouter = express.Router();
const dnsController = require('../controllers/dnsController');
const { auth } = require('../middleware/authorization');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
dnsrouter.post('/upload', auth, upload.single('file'), dnsController.uploadFile);
dnsrouter.get('/domains',auth, dnsController.getAllDomains);
dnsrouter.post('/domains',auth, dnsController.createDomain);
dnsrouter.put('/domains/:id',auth, dnsController.updateDomain);
dnsrouter.delete('/domains/:id',auth, dnsController.deleteDomain);
dnsrouter.patch('/domains/:id',auth, dnsController.updateDomainById);
dnsrouter.get('/domains/:id',auth, dnsController.getDomainById);
dnsrouter.get('/stats',auth, dnsController.getDomainStats);





module.exports = dnsrouter;
