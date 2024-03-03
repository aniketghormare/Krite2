
const Domain = require('../models/Domain');
const fs = require('fs');
const csvParser = require('csv-parser');

exports.getDomainById = async (req, res) => {
    try {
        const domainId = req.params.id;
        const getDomain = await Domain.find({ _id: domainId });
        if (!getDomain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json(getDomain);
    } catch (error) {
        console.error('Error updating domain by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateDomainById = async (req, res) => {
    try {
        const domainId = req.params.id;
        const updatedDomain = await Domain.findByIdAndUpdate({ _id: domainId }, req.body, { new: true });
        if (!updatedDomain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json(updatedDomain);
    } catch (error) {
        console.error('Error updating domain by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.uploadFile = async (req, res) => {

    try {
        const domains = [];


        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (row) => {

                Domain.findOneAndUpdate(
                    { name: row.name, type: row.type },
                    { $setOnInsert: { name: row.name, type: row.type } },
                    { upsert: true, new: true }
                )
                    .then(domain => {
                        domains.push(domain);
                    })
                    .catch(error => {
                        console.error('Error processing domain:', error);
                    });
            })
            .on('end', async () => {

                const data = await Domain.find()

                fs.unlinkSync(req.file.path);
                res.status(200).json({ message: 'CSV file uploaded successfully', domains: data.length });
            });
    } catch (error) {
        console.error('Error uploading CSV file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }











};





exports.getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDomain = async (req, res) => {

    const domain = new Domain({
        name: req.body.name,
        type: req.body.type,
        userID: req.body.userID

    });

    try {
        const newDomain = await domain.save();
        res.status(201).json(newDomain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDomain = async (req, res) => {
    try {
        const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDomain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDomain = async (req, res) => {
    try {
        await Domain.findByIdAndDelete(req.params.id);
        res.json({ message: 'Domain deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDomainStats = async (req, res) => {
    try {
        const domains = await Domain.find();


        const totalDomains = domains.length;
        const domainTypes = {};

        domains.forEach(domain => {
            if (domain.type in domainTypes) {
                domainTypes[domain.type]++;
            } else {
                domainTypes[domain.type] = 1;
            }
        });

        const statsData = {
            totalDomains: totalDomains,
            domainTypes: domainTypes
        };

        res.json(statsData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




