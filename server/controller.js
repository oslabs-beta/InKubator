const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const controller = {};

controller.deploymentYaml = async function(req, res, next) {
  try {
    const { clusterName, replicas, image, port, label } = req.body;
    // separate labels later??
      
    const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
    console.log('DOC', doc.metadata.labels);

    doc.metadata.name = `${clusterName}`;
    doc.spec.replicas = replicas;
    doc.spec.template.spec.containers.image = image;
    doc.spec.template.spec.containers[0].ports[0].containerPort = port;

    // app and name labels, all use the same label
    doc.metadata.labels.app = label;
    doc.spec.selector.matchLabels.app = label;
    doc.spec.template.metadata.labels.app = label;
    doc.spec.template.spec.containers[0].name = label;
    
    console.log('DOC AFTER', doc);
    
    const newDoc = yaml.dump(doc);
    console.log('NEW DOC', newDoc);
    fs.writeFile('./deployment.yaml', newDoc, err => {
        if (err) {
            next(err);
        };
    });

    return next();
  } catch (err) {
    return next({
      log: 'Couldn\'t update Deplyoment YAML file',
      message: { err: 'Error occurred in controller.deploymentYaml' + err },
    });
  };
};

controller.serviceYaml = function(req, res, next) {};

controller.deploy = function(req, res, next) {
  exec('kubectl apply -f ./deployment.yaml', (err, stdout, stderr) => {
    if (err) {
      return next({
          log: 'Couldn\'t Deploy YAML file',
          message: { err: 'Error occurred in controller.deploy' + err },
      });
    } else {
      console.log(`THE DEPLOY OUTPUT ${stdout}`);
      res.locals.deployOutput = stdout;
      return next();
    };
  });
};

controller.expose = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  // console.log(doc.metadata.name);
  const clusterName = doc.metadata.name;
  const targetPort = doc.spec.template.spec.containers[0].ports[0].containerPort;
  console.log('TARGET PORT', targetPort);
  
  exec(`kubectl expose deployment ${clusterName} --type LoadBalancer --port=80 --target-port ${targetPort}`, 
  (err, stdout, stderr) => {
      if (err) {
        return next({
          log: 'Couldn\'t Expose Deployment',
          message: { err: 'Error occurred in controller.expose' + err },
        });
      } else {
        console.log(`Exposed ${stdout}`);
        res.locals.exposedOutput = stdout;
        return next();
      };
  });
};

controller.getDeployment = function(req, res, next) {
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
        }
    })
};

controller.getPods = function(req, res, next) {
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
        }
    })
};




module.exports = controller;