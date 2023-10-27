const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const statusController = {};

statusController.getDeployment = async (req, res, next) => {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  const imageName = doc.spec.template.spec.containers[0].image;

  exec('kubectl get deployments', (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t get deployments',
              message: { err: 'Error occurred in statusController.getDeployment: ' + err },
          });
      } else {
          console.log(`THE GET DEPLOYMENT OUTPUT ${stdout}`);
          res.locals.getDeploymentOutput = stdout.concat(imageName);
          return next();
      };
  });
};

statusController.getService = (req, res, next) => {
  exec(`kubectl get services`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Get Service',
        message: { err: 'Error occurred in statusController.getService ' + err },
      });
    } else {
      console.log(`THE GET SERVICES OUTPUT ${stdout}`);
      res.locals.serviceOutput = stdout;
      return next();
    };
  });
};

statusController.getPods = (req, res, next) => {
  exec('kubectl get pods', (err, stdout, stderr) => {
      if (err) {
          return next({
              log: 'Couldn\'t get pods',
              message: { err: 'Error occurred when getting pods: ' + err },
          });
      } else {
          console.log(`THE GET PODS OUTPUT ${stdout}`);
          res.locals.getPodsOutput = stdout;
          return next();
      };
  });
};

  statusController.deleteService = async (req, res, next) => {
    const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
    const clusterName = doc.metadata.name;
    console.log('CLUSTER NAME ', clusterName);
    
    exec(`kubectl delete service ${clusterName}`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Delete Service',
        message: { err: `Error occurred in statusController.deleteService: ${err}` },
      });
    } else {
      console.log('OUTPUT FROM DELETE SERVICE ', stdout);
      res.locals.deleteService = stdout;
      return next();
    }
  });
};

statusController.deleteDeployment = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  const clusterName = doc.metadata.name;

  exec(`kubectl delete deployment ${clusterName}`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Delete Deployment',
        message: { err: `Error occurred in statusController.deleteDeployment: ${err}` },
      });
    } else {
      console.log(stdout);
      res.locals.deleteDeployment = stdout;
      return next();
    }
  });
};

module.exports = statusController;