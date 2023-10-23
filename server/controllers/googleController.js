const { exec, spawn } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const outputToObj = (string) => {
    // Takes string, strips whitespace and line breaks returns an array of only the strings
    const finalArr = [];
    let arr = string.split('\n').join(' ').split(' ');
    arr.forEach(ele => { if (ele !== '') {finalArr.push(ele)}});    

    let finalObj = {};
    let finalRes = [];
    // Object to check if the first char of the next column is a "number" string
    const nums = { 
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
    };
    
    // Creates an arr of the row header values
    let endOfRow = finalArr.indexOf("STATUS");
    const rowArr = [];
    for (let i = 0; i <= endOfRow; i++) rowArr.push(finalArr[i]);

    // Iterates over the array of string values, starting at the first non-header string
    let tally = 0;
    for (let i = endOfRow + 1; i < finalArr.length; i++) {
        const ele = finalArr[i];
        const rowHead = rowArr[tally];

        // Logic to make sure that MASTER_IP and NUM_NODES fields aren't empty
        if(rowHead === 'MASTER_IP') {
            if (nums[ele[0]]) {
                finalObj[rowHead] = ele;
            } else {
                finalObj[rowHead] = 'undefined';
                finalObj[rowArr[tally + 1]] = ele;
                i - 1;
                tally++;
            };
        } else if(rowHead === 'NUM_NODES') {
            if (nums[ele[0]]) {
                finalObj[rowHead] = ele;
            } else {
                finalObj[rowHead] = 'undefined';
                finalObj[rowArr[tally + 1]] = ele;
                i - 1;
                tally++;
            };
        } else {
            finalObj[rowHead] = ele;
        };

        // Logic to create a new object of key value pairs, and push the current object to our final array
        if(Object.keys(finalObj).length === endOfRow + 1) {
            finalRes.push(finalObj);
            finalObj = {};
            tally = 0;
        } else {
            tally++;
        };
    };

    // Logic to deal with any remaining object that wasn't pushed to the result array
    if (Object.keys(finalObj).length !== 0) {
        finalRes.push(finalObj)
    };
    return finalRes;
};

const googleController = {};

googleController.createCluster = (req, res, next) => {
    const { clusterName } = req.body;

    exec(`gcloud container clusters create-auto ${clusterName} \
    --location=us-central1`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t create Google Cluster',
                message: { err: 'Error occurred in googleController.createCluster ' + err },
            });
        } else {
            res.locals.googleCreateClusterOutput = stdout;
        }
        return next();
    });
};

googleController.getClusters = (req, res, next) => {
    console.log('MADE IT TO GET CLUSTERS')
    exec(`gcloud container clusters list`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t get clusters',
                message: { err: 'Error occurred in googleController.getClusters ' + err },
            });
        } else {
            const { NAME, LOCATION, STATUS} = outputToObj(stdout);
            // console.log('GRABBED DATA', outputToObj(stdout));
            res.locals.getClusters = outputToObj(stdout);
        }
        return next();
    });
};

googleController.getCredentials = (req, res, next) => {
    console.log('MADE IT TO GET CREDS')
    const { clusterName } = req.body;
    console.log('clusterName', clusterName)
    // TIES YOUR 'KUBECTL' COMMAND TO THE GOOGLE CLOUD CLUSTER
    exec(`gcloud container clusters get-credentials ${clusterName} --location us-central1`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Couldn\'t get Google Credentials',
                message: { err: 'Error occurred in googleController.getCredentials ' + err },
            });
        } else {
            res.locals.getCreds = stdout;
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
                message: { err: 'Error occurred in googleController.deploy ' + err },
            });
        } else {
            res.locals.googleDeploy = stdout;
        }
        return next();
    });
};

googleController.testFunc = (req, res, next) => {
    exec(`gcloud --flags-file=deployment.yaml`, (err, stdout, stderr) => {
        if (err) {
            return next({
                log: 'Error in test func',
                message: { err: 'Error occurred in googleController.testFunc ' + err },
            });
        } else {
            res.locals.test = stdout;
        };
        return next();
    });
};

module.exports = googleController;