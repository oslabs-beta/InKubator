const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const googleController = {};

googleController.createCluster = (req, res, next) => {
    const { clusterName } = req.body;

    exec(`gcloud container clusters create-auto ${clusterName} \
    --location=us-central1`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t create Google Cluster',
                message: { err: 'Error occurred in googleController.createCluster' + err },
            });
        } else {
            res.locals.googleOutput = stdout;
        }
        return next();
    });
};

googleController.getCredentials = (req, res, next) => {
    const { clusterName } = req.body;
    
    exec(`gcloud container clusters get-credentials ${clusterName} \
    --location us-central1`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t get Google Credentials',
                message: { err: 'Error occurred in googleController.getCredentials' + err },
            });
        } else {
            res.locals.googleOutput = stdout;
        };
        return next();
    });
};

googleController.deploy = (req, res, next) => {
    const { clusterName, image } = req.body;
    
    exec(`kubectl create deployment ${clusterName} \
    --image=${image}`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t deploy to Google Cloud',
                message: { err: 'Error occurred in googleController.deploy' + err },
            });
        } else {
            res.locals.googleOutput = stdout;
        }
        return next();
    });
};


module.exports = googleController;