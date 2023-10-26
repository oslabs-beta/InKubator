const express = require('express');
const googleRouter = express.Router();
const googleController = require('../controllers/googleController.js');

googleRouter.use('/createCluster', googleController.createCluster, (req, res, next) => {
    // console.log('Made it past create cluster middleware');
    return res.status(200);
});

googleRouter.use('/getClusters', googleController.getClusters, (req, res, next) => {
    // console.log('Made it past get cluster middleware');
    return res.status(200).json(res.locals.getClusters);
});

googleRouter.use('/getCredentials', googleController.getCredentials, (req, res, next) => {
    // console.log('Made it past getCredentials middleware', res.locals.getCreds);
    return res.status(200).json(res.locals.getCreds);
});

googleRouter.use('/deploy', googleController.deploy, (req, res, next) => {
    // console.log('Made it past deploy middleware');
    return res.status(200);
});

googleRouter.use('/test', googleController.testFunc, (req, res, next) => {
    // console.log('Made it past test middleware');
    return res.status(200).json(res.locals.test);
});

module.exports = googleRouter;