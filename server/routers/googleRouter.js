const express = require('express');
const googleRouter = express.Router();
const googleController = require('../controllers/googleController.js');

googleRouter.use('/createCluster', googleController.createCluster, (req, res, next) => {
    console.log('Made it past create cluster middleware');
    return res.status(200);
});

googleRouter.use('/getCredentials', googleController.getCredentials, (req, res, next) => {
    console.log('Made it past getCredentials middleware');
    return res.status(200);
});

googleRouter.use('/deploy', googleController.deploy, (req, res, next) => {
    console.log('Made it past deploy middleware');
    return res.status(200);
});

module.exports = googleRouter;