const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.use('/yaml', controller.deploymentYaml, (req, res, next) => {
    
    return res.status(200).json('Deployment YAML Created')
});

router.use('/service', controller.serviceYaml, (req, res, next) => {
    
    return res.status(200).json('Service YAML Created')
});

router.use('/deploy', controller.deploy, (req, res, next) => {

    return res.status(200).json(`Cluster Deployed Status: ${res.locals.deployOutput}`)
});

router.use('/getDeployment', controller.getDeployment, (req, res, next) => {

    return res.status(200).json(`Deployments: ${res.locals.getDeploymentOutput}`)
});

router.use('/getPods', controller.getPods, (req, res, next) => {

    return res.status(200).json(`Pods: ${res.locals.getPodsOutput}`)
});

router.use('/expose', controller.expose, (req, res, next) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});

module.exports = router;