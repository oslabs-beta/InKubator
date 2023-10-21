const { exec, spawn, ChildProcess } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

let tunnelProcess;

const controller = {};

controller.deploymentYaml = async function(req, res, next) {
  try {
    let { clusterName, replicas, image, port, label } = req.body;
    // separate labels later??

    const doc = await yaml.load(fs.readFileSync('./deployment-template.yaml', 'utf8'));
    console.log('DOC', doc.metadata.labels);

    // REQUIRED
    doc.metadata.name = `${clusterName}`;
    doc.spec.replicas = replicas;
    
    // app and name labels, all use the same label
    doc.metadata.labels.app = label;
    doc.spec.selector.matchLabels.app = label;
    doc.spec.template.metadata.labels.app = label;
    doc.spec.template.spec.containers[0].name = label;

    // OPTIONAL
    doc.spec.template.spec.containers[0].image = image;
    doc.spec.template.spec.containers[0].ports[0].containerPort = port;
    
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
      message: { err: 'Error occurred in controller.deploymentYaml ' + err },
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
  if(!tunnelProcess) {
    tunnelProcess = spawn('minikube', ['tunnel']);
      tunnelProcess.stdout.on('data', (data) => {
        console.log('STARTED TUNNEL');
        return next();
      });
      tunnelProcess.on('error', (error) => {
        console.log(`ERROR: ${error}`);
        return next({
          log: 'Could not create tunnel',
          message: `Error in creating tunnel: ${error}`,
        });
      });

  } else {
    console.log('TUNNEL already exists');
    return next();
  };
};

  controller.killTunnel = function(req, res, next) {
    if(tunnelProcess) {
      tunnelProcess.kill();
      tunnelProcess = null;
      console.log('Tunnel process is killed');
    };
    return next();
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
          message: { err: 'Error occurred in controller.expose ' + err },
        });
      } else {
        console.log(`Exposed ${stdout}`);
        res.locals.exposedOutput = stdout;
        return next();
      };
  });
};

controller.deleteService = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  const deploymentName = doc.metadata.name;
  console.log(deploymentName);

  exec(`kubectl delete service ${deploymentName}`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Delete Service',
        message: { err: `Error occurred in controller.deleteService: ${err}` },
      });
    } else {
      console.log(stdout);
      res.locals.deleteService = stdout;
      return next();
    };
  });
};

controller.deleteDeployment = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
  const deploymentName = doc.metadata.name;
  console.log(deploymentName);

  exec(`kubectl delete deployment ${deploymentName}`, (err, stdout, stderr) => {
    if (err) {
      return next({
        log: 'Couldn\'t Delete Deployment',
        message: { err: `Error occurred in controller.deleteDeployment: ${err}` },
      });
    } else {
      console.log(stdout);
      res.locals.deleteDeployment = stdout;
      return next();
    };
  });
};

module.exports = controller;