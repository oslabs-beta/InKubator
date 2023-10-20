const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.use('oneClick', controller.deploymentYaml, controller.deploy, controller.expose, (req, res, next) => {
    console.log('made it past middlewares in oneClick')
    return res.status(200).json('All Done')
});

router.use('/yaml', controller.deploymentYaml, (req, res, next) => {
    
    return res.status(200).json('Deployment YAML Created')
});

router.use('/service', controller.serviceYaml, (req, res, next) => {
    
    return res.status(200).json('Service YAML Created')
});

router.use('/tunnel', controller.tunnel, (req, res, next) => {
    
    return res.status(200).json(`Tunnel Created: ${res.locals.tunnelOutput}`)
});

router.use('/deploy', controller.deploy, (req, res, next) => {

    return res.status(200).json(`Cluster Deployed Status: ${res.locals.deployOutput}`)
});

router.use('/expose', controller.expose, (req, res, next) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});

module.exports = router;