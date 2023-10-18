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

module.exports = statusRouter;