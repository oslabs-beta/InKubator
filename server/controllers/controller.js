const { exec, spawn, ChildProcess } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

let tunnelProcess;
let minikubeProcess;

const controller = {};

controller.startMinikube = function(req, res, next) {
  if(!minikubeProcess) {
    minikubeProcess = spawn('minikube', ['start']);
      minikubeProcess.stdout.on('data', (data) => {
        console.log(`Minikube start initiated. Message from minikube ${data}`);
        return next();
      });
      minikubeProcess.on('error', (error) => {
        console.log(`ERROR: ${error}`);
        return next({
          log: 'Could not start minikube',
          message: `Error in starting minikube: ${error}`,
        });
      });

  } else {
    console.log('Minikube already started');
    return next();
  };
};

controller.deploymentYaml = async function(req, res, next) {
  try {
    let { clusterName, replicas, image, port, label } = req.body;

    const doc = await yaml.load(fs.readFileSync('./deployment-template.yaml', 'utf8'));
    console.log('DOC', doc.metadata.labels);

  //Set name
    doc.metadata.name = `${clusterName}`;

  //Set number of replicas
    doc.spec.replicas = replicas;
    
    // App and name labels, all use the same label
    doc.metadata.labels.app = label;
    doc.spec.selector.matchLabels.app = label;
    doc.spec.template.metadata.labels.app = label;
    doc.spec.template.spec.containers[0].name = label;

  //Set Docker image
    doc.spec.template.spec.containers[0].image = image;
    
  //Set Docker container app port  
    doc.spec.template.spec.containers[0].ports[0].containerPort = port;
    
    console.log('DOC AFTER', doc);
  
  //Convert doc to YAML
    const newDoc = yaml.dump(doc);
    console.log('NEW DOC', newDoc);
  
  //Write to new YAML file
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

//Deployment of YAML
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

//Tunnel is required for minikube only to provide external IP to access deployed app
controller.tunnel = function(req, res, next) {
  //Execute tunnel if it doesn't exists yet
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

//Kill tunnel child process
  controller.killTunnel = function(req, res, next) {
    if(tunnelProcess) {
      tunnelProcess.kill();
      tunnelProcess = null;
      console.log('Tunnel process is killed');
    };
    return next();
  };

//Create load balancer and expose app on port 9000
controller.expose = async function(req, res, next) {
  const doc = await yaml.load(fs.readFileSync('./deployment.yaml', 'utf8'));
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


module.exports = controller;