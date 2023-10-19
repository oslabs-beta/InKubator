import React, { useState } from "react";
import { Button, MenuItem, Tab, Tabs, TextField, Typography } from '@mui/material';


const deploymentKinds = [
    {
        value: 'Deployment',
        label: 'Deployment',
    },
    {
        value: 'DaemonSet',
        label: 'DaemonSet',
    },
    {
        value: 'StatefulSet',
        label: 'StatefulSet',
    },
];

const Form = () => {
    const [deploymentName, setDeploymentName] = useState('');
    const [numReplicas, setNumReplicas] = useState(1);
    const [clusterLabel, setClusterLabel] = useState('test-label');
    const [dockerImage, setDockerImage] = useState('registry.k8s.io/e2e-test-images/agnhost:2.39');
    const [containerPort, setContainerPort] = useState(8080);

    const handleInputChange = (e, setter, isNum = false) => {
        if (isNum) {
          setter(parseInt(e.target.value));
          console.log(typeof e.target.value);
        } else {
          setter(e.target.value);
          console.log(e.target.value);
        }
    };

    const handlePostYaml = async (e) => {
        e.preventDefault();

        const yamlObj = {
            clusterName: deploymentName,
            replicas: numReplicas,
            image: dockerImage,
            port: containerPort,
            label: clusterLabel
        };
        console.log(yamlObj);

        try {

            const postYaml = await fetch('/api/yaml', {
                method: "POST",
                mode: "cors",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(yamlObj)
            });

            const jsonRes = await postYaml.json();
            console.log(jsonRes);
        } catch(err) {
            console.log(`ERROR : ${err}`);
        }
    };

    const handleDeploy = async (e) => {
        
        try {
            const deployYaml = await fetch('api/deploy')
            const resDeploy = await deployYaml.json();
            console.log('DEPLOY RESULTS', resDeploy);
        } catch(err) {
            console.log(`ERROR: ${err}`);
        }
    };

    const handleExpose = async (e) => {
        
        try {
            const exposeYaml = await fetch('api/expose')
            const resExpose = exposeYaml.json();
        } catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }


    return (
      <div id="test-form">

        {/* HEADER */}
        <div class="form-header">
            <strong>Launch Kubernetes with Minikube</strong>
        </div>
       
        <div id="form-div1" class="form-section-header">
          <strong>Deployment details</strong>
        </div>
        
        <div class="form-div2">
          <p>Deployment kind</p>
          <TextField 
            id="outlined-select-deployment-kind" 
            select 
            label="Select" 
            defaultValue="Deployment"
          >
            {deploymentKinds.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
          </TextField>
  
          <p>Deployment name</p>
          <p>Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.</p>     
          <TextField 
            id="deploymentName" 
            label="Deployment name" 
            variant="outlined" 
            onChange={(e) => handleInputChange(e, setDeploymentName)}
          />
          
          <p>Labels</p>
          <p>Labels are custom key/value pairs that are assigned to Kubernetes resources. The labels defined in the Deployment section are applied to the Deployment, Pod, Service, Ingress, ConfigMap and Secret resources.
            The labels are optional, as we will automatically add the tags required to manage the Kubernetes resources.</p> 
          <TextField 
            id="deploymentName" 
            label="Deployment name" 
            variant="outlined" 
            onChange={(e) => handleInputChange(e, setClusterLabel)}
          />
        </div>
        
        <div id="form-div3" class="form-section-header">
            <strong>Pod details</strong>
        </div>
        
        <div class="form-div4">
          <p>Docker image</p>
          <p>If you don't have a containerized app, let us deploy a sample app for you. You can leave this field empty.</p>
          <TextField 
            id="dockerImage" 
            label="Docker image" 
            variant="outlined" 
            onChange={(e) => handleInputChange(e, setDockerImage)
          }/>
          
          <p>Port number</p>
          <p>The port number must be a number between 1 and 65535. NOTE: The port MUST match the port defined in your Docker image. If you don't have a Docker image leave this field empty.</p>
          <TextField
            required
            id="containerPort"
            label="Required"
            type="number"
            defaultValue="Hello World"
            variant="outlined"
            onChange={(e) => handleInputChange(e, setContainerPort, true)}
          />
  
          <p>Number of replicas</p>
          <p>The desired number of Pod resources is set in the Replicas field.</p>
          <TextField 
            id="numReplicas" 
            label="Number of replicas" 
            type="number" 
            variant="outlined" 
            onChange={(e) => handleInputChange(e, setNumReplicas, true)}
          />
        </div>
  
        {/* FOOTER */}
        <div class="form-footer">
          <Button id="yaml-button" variant="outlined" onClick={(e) => {handlePostYaml(e)}}>Generate YAML</Button>
          <Button id="expose-button" variant="outlined" onClick={(e) => {handleExpose(e)}}>Expose</Button>
          <Button id="deploy-button" variant="contained" onClick={(e) => {handleDeploy(e)}}>Deploy</Button>
        </div>
      </div>
    )
}

export default Form;