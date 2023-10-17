const express = require('express');
const googleRouter = express.Router();
const googleController = require('./googleController.js');

// googleRouter.use('/', (req, res, next) => {
//     return res.status(200).send('THIS WORKS')
// })

googleRouter.use('/createCluster', googleController.createCluster, (req, res, next) => {

    return res.status(200);
});

googleRouter.use('/getCredentials', googleController.getCredentials, (req, res, next) => {

    return res.status(200);
});

googleRouter.use('/deploy', googleController.deploy, (req, res, next) => {

    return res.status(200);
});

module.exports = googleRouter;