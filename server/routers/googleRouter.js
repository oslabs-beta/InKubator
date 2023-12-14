const express = require('express');
const googleRouter = express.Router();
const googleController = require('../controllers/googleController.js');

googleRouter.use('/getProjects', googleController.getProjects, (req, res, next) => {
    console.log('Made it past get projects middleware');
    return res.status(200).json(res.locals.googleGetProjects);
});

googleRouter.use('/selectProject', googleController.selectProject, (req, res, next) => {
    console.log('Made it past select project middleware');
    return res.status(200).json(`${res.locals.googleSelectProject}, Project was selected!`);
});

googleRouter.use('/createCluster', googleController.createCluster, (req, res, next) => {
    // console.log('Made it past create cluster middleware');
    return res.status(200);
});

googleRouter.use('/getClusters', googleController.getClusters, (req, res, next) => {
    console.log('Made it past get cluster middleware');
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

googleRouter.use('/getEndpoint', googleController.getEndpoint, (req, res) => {
    // console.log('Made it past test middleware');
    return res.status(200).json(res.locals.endpoint);
});

googleRouter.use('/test', googleController.testFunc, (req, res, next) => {
    // console.log('Made it past test middleware');
    return res.status(200).json(res.locals.test);
});

googleRouter.use('/inputAnything', googleController.inputAnything, (req, res, next) => {
    // console.log('Made it past inputAnything middleware');
    return res.status(200).json(res.locals.inputAnything);
});

module.exports = googleRouter;