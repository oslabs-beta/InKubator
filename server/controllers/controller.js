const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const controller = {};

controller.deploymentYaml = async function(req, res, next) {
  try {
    let { clusterName, replicas, image, port, label } = req.body;
    // separate labels later??

    console.log('IMAGE', image)
    const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
    console.log('DOC', doc.metadata.labels);

    // REQUIRED
    doc.metadata.name = `${clusterName}`;
    doc.spec.replicas = replicas;
    
    // OPTIONAL
      doc.spec.template.spec.containers[0].image = image;

    if (port) {
      doc.spec.template.spec.containers[0].ports[0].containerPort = port;
    } else {
      doc.spec.template.spec.containers[0].ports[0].containerPort = 3000;
    }
    
    // app and name labels, all use the same label
    doc.metadata.labels.app = label;
    doc.spec.selector.matchLabels.app = label;
    doc.spec.template.metadata.labels.app = label;
    doc.spec.template.spec.containers[0].name = label;
    
    console.log('DOC AFTER', doc);
    console.log('DOC IMAGE AFTER', doc.spec.template.spec.containers[0].image);
    
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
          message: { err: 'Error occurred in controller.deploy ' + err },
      });
    } else {
      console.log(`THE DEPLOY OUTPUT ${stdout}`);
      res.locals.deployOutput = stdout;
      return next();
    };
  });
};

controller.tunnel = function(req, res, next) {
  exec('minikube tunnel', (err, stdout, stderr) => {
    if (err) {
      next({
        log: 'Could not create tunnel',
        message: `Error in creating tunnel: ${err}`,
      });
    }
    return next();
  })
};

controller.expose = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  // console.log(doc.metadata.name);
  const clusterName = doc.metadata.name;
  const targetPort = doc.spec.template.spec.containers[0].ports[0].containerPort;
  console.log('TARGET PORT', targetPort);
  
  exec(`kubectl expose deployment ${clusterName} --type LoadBalancer --port=9000 --target-port ${targetPort}`, 
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

module.exports = controller;