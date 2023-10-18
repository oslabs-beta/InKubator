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
    const [numReplicas, setNumReplicas] = useState(0);
    const [clusterLabel, setClusterLabel] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [containerPort, setContainerPort] = useState(0);

    const handleInputChange = (e, setter, isNum = false) => {
        if (isNum) {
            setter(parseInt(e.target.value));
            console.log(typeof e.target.value);
        } else {
        setter(e.target.value);
        console.log(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
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


    return (
        <div id="minikube-form">

          <div class="form-header" id="form-header1"> 
            <Typography variant="h4" component="h4">Deployment</Typography>
            <Typography variant="h6" component="h6">Define your deployment resources</Typography>
          </div>

          <div class="form-header" id="form-header2"> 
            <Typography variant="h4" component="h4">Pods</Typography>
            <Typography variant="h2" component="h2">Define your pod details and resources</Typography>
          </div>

          <form class="form-questions" id="form-questions1">

            <Typography variant="h6" component="h6">Deployment kind:</Typography>
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

            {/* <label for="deploymentName">Deployment name:</label> */}
            <Typography variant="h6" component="h6">Deployment name:</Typography>
            <Typography className="info" variant="body2" component="body2">
                Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.
            </Typography>
            <TextField id="deploymentName" label="Deployment name" variant="outlined" onChange={(e) => handleInputChange(e, setDeploymentName)}/>
            {/* <input type="text" id="deploymentName" onChange={(e) => handleInputChange(e, setDeploymentName)} /> */}
    
            <Typography variant="h6" component="h6">Number of replicas:</Typography>
            <Typography className="info" variant="body2" component="body2">
                The desired number of Pod resources is set in the Replicas field.
            </Typography>
            <TextField id="numReplicas" label="Number of replicas" type="number" variant="outlined" onChange={(e) => handleInputChange(e, setNumReplicas)}/>
            {/* <label for="numReplicas">Number of replicas:</label> */}
            {/* <input type="number" id="numReplicas" onChange={(e) => handleInputChange(e, setNumReplicas)} /> */}
            {/* <p className="info">The desired number of Pod resources is set in the Replicas field.</p> */}

            <Typography variant="h6" component="h6">Container Label:</Typography>
            <Typography className="info" variant="body2" component="body2">
                Labels are custom key/value pairs that are assigned to Kubernetes resources.
            </Typography>
            <TextField id="clusterLabel" label="Container label" variant="outlined" onChange={(e) => handleInputChange(e, setClusterLabel)}/>
            {/* <input type="text" id="clusterLabel" onChange={(e) => handleInputChange(e, setClusterLabel)} /> */}
            {/* <label for="clusterLabel">Container label:</label> */}
            {/* <p className="info">Labels are custom key/value pairs that are assigned to Kubernetes resources.</p> */}
            
            <Typography variant="h6" component="h6">Docker image:</Typography>
            <Typography className="info" variant="body2" component="body2">
                Optional: Reference a container image from a Docker feed.
            </Typography>
            <TextField id="dockerImage" label="Docker image" variant="outlined" onChange={(e) => handleInputChange(e, setDockerImage)}/>
            {/* <label for="dockerImage">Docker Image:</label> */}
            {/* <input type="text" id="dockerImage" onChange={(e) => handleInputChange(e, setDockerImage)} /> */}
            {/* <p>Optional: reference a container image from a Docker feed. </p> */}
            
            <Typography variant="h6" component="h6">Port number:</Typography>
            <Typography className="info" variant="body2" component="body2">
                Port number is required and must be a number between 1 and 65535.
            </Typography>
            <TextField
                required
                id="containerPort"
                label="Required"
                type="number"
                defaultValue="Hello World"
                variant="outlined"
                onChange={(e) => handleInputChange(e, setContainerPort)}
            />
            {/* <input type="number" id="containerPort" variant="outlined" onChange={(e) => handleInputChange(e, setContainerPort)} /> */}
            {/* <label for="containerPort">Port Number:</label> */}
            {/* <p>The Port number is required and must be a number between 1 and 65535.</p> */}

            <button id="btnMinikube" variant="contained" onClick={(e) => {handleSubmit(e)}}>Deploy</button>
            <br/>

        </form>

        <div class="form-questions" id="form-questions2">
          <TextField label="Testing field" variant="outlined" fullWidth margin="normal" />

            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Deployment name"
            />
            <TextField label="Testing field" variant="outlined" fullWidth margin="normal" />
            <Button id="deployment-button" variant="contained">Hello world</Button>
        </div>

      </div>
    )
}

export default Form;