const express = require('express');
const statusRouter = express.Router();
const statusController = require('../controllers/statusController.js');

statusRouter.use('/getService', statusController.getService, (req, res, next) => {

    return res.status(200).json(`Service information: ${res.locals.serviceOutput}`);
});

statusRouter.use('/getDeployment', statusController.getDeployment, (req, res, next) => {

    return res.status(200).json(`Deployments: ${res.locals.getDeploymentOutput}`);
});

statusRouter.use('/getPods', statusController.getPods, (req, res, next) => {

    return res.status(200).json(`Pods: ${res.locals.getPodsOutput}`);
});

statusRouter.use('/deleteDeployment', statusController.deleteDeployment, (req, res, next) => {

    return res.status(200).json(`Deployment deleted: ${res.locals.deleteDeployment}`);
});

statusRouter.use('/deleteService', statusController.deleteDeployment, (req, res, next) => {

    return res.status(200).json(`Service Deleted: ${res.locals.deleteService}`);
});


module.exports = statusRouter;