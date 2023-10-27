const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');


router.use('/startminikube', controller.startMinikube, (req, res) => {

    return res.status(200).json('Minikube started')
});


router.use('/yaml', controller.deploymentYaml, (req, res) => {
    
    return res.status(200).json('Deployment YAML Created')
});


router.use('/deploy', controller.deploy, (req, res) => {

    return res.status(200).json(`Cluster Deployed Status: ${res.locals.deployOutput}`)
});


router.use('/tunnelexpose', controller.tunnel, controller.expose, (req, res) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});


router.use('/expose', controller.expose, (req, res) => {
    return res.status(200).json(`Exposure: ${res.locals.exposedOutput}`)
});


module.exports = router;