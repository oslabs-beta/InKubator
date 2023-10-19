const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const statusController = {};

statusController.getService = async (req, res, next) => {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  const clusterName = doc.metadata.name;

  exec(`kubectl get service ${clusterName}`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Get Service',
        message: { err: 'Error occurred in controller.getService' + err },
      });
    } else {
      res.locals.serviceOutput = stdout;
      return next();
    };
  });
};

statusController.getDeployment = (req, res, next) => {
  exec('kubectl get deployments', (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t get deployments',
              message: { err: 'Error occurred when getting deplyoments:' + err },
          });
      } else {
          console.log(`THE GET DEPLOYMENT OUTPUT ${stdout}`);
          res.locals.getDeploymentOutput = stdout;
          return next();
      };
  });
};

statusController.getPods = (req, res, next) => {
  exec('kubectl get pods', (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t get pods',
              message: { err: 'Error occurred when getting pods:' + err },
          });
      } else {
          console.log(`THE GET PODS OUTPUT ${stdout}`);
          res.locals.getPodsOutput = stdout;
          return next();
      };
  });
};


statusController.deleteDeployment = (req, res, next) => {
  const { clusterName } = req.body;
  
  exec(`kubectl delete deployment ${clusterName}`, (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t delete Google Cloud Deployment',
              message: { err: 'Error occurred in statusController.deleteDeployment' + err },
          });
      } else {
          res.locals.deleteDeployment = stdout;
      }
      return next();
  });
};

statusController.deleteService = (req, res, next) => {
  const { clusterName } = req.body;
  
  exec(`kubectl delete service ${clusterName}`, (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t delete Deployment',
              message: { err: 'Error occurred in statusController.deleteDeployment' + err },
          });
      } else {
          res.locals.deleteService = stdout;
      }
      return next();
  });
};


module.exports = statusController;