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
    const [clusterLabel, setClusterLabel] = useState('hello-node');
    const [dockerImage, setDockerImage] = useState('registry.k8s.io/e2e-test-images/agnhost:2.39');
    const [containerPort, setContainerPort] = useState(8080);


    //handleInputChange collects user input from form fields
    const handleInputChange = (e, setter, isNum = false) => {
        if (isNum) {
            setter(parseInt(e.target.value));
            console.log(e.target.value);
        } else {
        setter(e.target.value);
        console.log(e.target.value);
        }
    };

    //handlePostYaml POSTs user input to YAML file
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
            const resDeploy = deployYaml.json();
            console.log(resDeploy);
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
        <div class="form-header">Launch Kubernetes with Minikube</div>
       
        <div id="form-div1" class="form-section-header">
          Deployment details
        </div>
        
        <div class="form-div2">
          <p>Deployment kind: </p>
          <TextField id="outlined-select-deployment-kind" select label="Select" defaultValue="Deployment">
            {deploymentKinds.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
          </TextField>
  
          <p>Deployment name:</p>
          <p>Each Deployment resource requires a unique Deployment Name.</p> 
          <p>Kubernetes resources are identified by their names.</p>
          <TextField id="deploymentName" label="Deployment name" variant="outlined" onChange={(e) => handleInputChange(e, setDeploymentName)}/>
          
          <p></p>
        </div>
        
        <div id="form-div3" class="form-section-header">Pods details</div>
        
        <div class="form-div4">
          <p>Docker image: </p>
          <TextField id="dockerImage" label="Docker image" variant="outlined" onChange={(e) => handleInputChange(e, setDockerImage)}/>
          
          <p>Port number:</p>
          <p>The port number is required and must be a number between 1 and 65535.</p>
          <TextField
            required
            id="containerPort"
            label="Required"
            type="number"
            defaultValue="Hello World"
            variant="outlined"
            onChange={(e) => handleInputChange(e, setContainerPort)}
          />
  
          <p>Number of replicas</p>
          <p>The desired number of Pod resources is set in the Replicas field.</p>
          <TextField id="numReplicas" label="Number of replicas" type="number" variant="outlined" onChange={(e) => handleInputChange(e, setNumReplicas)}/>
        </div>
  
        {/* FOOTER */}
        <div class="form-footer">
          <Button id="btnMinikube" variant="contained" onClick={(e) => {handleSubmit(e)}}>Deploy</Button>
        </div>
      </div>
    )
}

export default Form;