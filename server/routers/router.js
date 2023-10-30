const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.use('oneClick', controller.deploymentYaml, controller.deploy, controller.expose, (req, res, next) => {
    console.log('made it past middlewares in oneClick')
    return res.status(200).json('All Done')
});


router.use('/startminikube', controller.startMinikube, (req, res) => {

    return res.status(200).json('Minikube started')
});

router.use('/yaml', controller.deploymentYaml, (req, res) => {
    
    return res.status(200).json('Deployment YAML Created')
});

router.use('/service', controller.serviceYaml, (req, res) => {
    
    return res.status(200).json('Service YAML Created')
});

router.use('/tunnel', controller.tunnel, (req, res) => {
    
    return res.status(200).json(`Tunnel Created`)
});

router.use('/killtunnel', controller.killTunnel, (req, res) => {

    return res.status(200).json(`Tunnel Killed`)
});

router.use('/deploy', controller.deploy, (req, res) => {

    return res.status(200).json(`Cluster Deployed Status: ${res.locals.deployOutput}`)
});

router.use('/tunnelexpose', controller.tunnel, controller.expose, (req, res, next) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});

router.use('/expose', controller.expose, (req, res) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});

router.use('/delete', controller.deleteService, controller.deleteDeployment, controller.killTunnel, (req, res) => {
    return res.status(200).json(res.locals)
});

module.exports = router;