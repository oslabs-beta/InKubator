const express = require('express');
const statusRouter = express.Router();
const statusController = require('../controllers/statusController.js');

statusRouter.use('/getDeployment', statusController.getDeployment, (req, res) => {

    return res.status(200).json(`Deployments: ${res.locals.getDeploymentOutput}`);
});


statusRouter.use('/getService', statusController.getService, (req, res) => {

    return res.status(200).json(`Service information: ${res.locals.serviceOutput}`);
});


statusRouter.use('/getPods', statusController.getPods, (req, res) => {

    return res.status(200).json(`Pods: ${res.locals.getPodsOutput}`);
});

statusRouter.use('/deleteService', statusController.deleteService, (req, res) => {

    return res.status(200).json(`Service Deleted: ${res.locals.deleteService}`);
});


statusRouter.use('/deleteDeployment', statusController.deleteDeployment, (req, res) => {

    return res.status(200).json(`Deployment deleted: ${res.locals.deleteDeployment}`);
});


statusRouter.use('/delete', statusController.deleteService, statusController.deleteDeployment, (req, res) => {
    return res.status(200).json(res.locals)
});


module.exports = statusRouter;