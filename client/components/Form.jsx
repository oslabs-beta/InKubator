import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Grid, Button, MenuItem, IconButton, Fab, TextField, Typography, Tooltip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { InfoOutlined } from "@mui/icons-material";
import YamlGenerator from './YamlGenerator';

const theme = createTheme({
  palette: {
    purple: {
      main: '#8870E0',
      light: '#e2e5fa',
      contrastText: '#fff'
    },
  },
});

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
  const [formValues, setFormValues] = useState({
    deploymentName: {
      value: "",
      error: false,
      errorMessage: "Deployment name is either blank or invalid"
    },
    labelNames: {
      value: "",
      error: false,
      errorMessage: "Label name is either blank or invalid"
    },
    dockerImage: {
      value: "registry.k8s.io/e2e-test-images/agnhost:2.39",
      error: false,
      errorMessage: "Docker image is invalid"
    },
    portNumber: {
      value: 8080,
      error: false,
      errorMessage: "Invalid port number"
    },
    replicas: {
      value: 1,
      error: false,
      errorMessage: "Invalid number of replicas"
    },
  })    

  // useState for (YAML, deploy, expose) button feedback rendered at the bottom
  const [buttonFeedback, setButtonFeedback] = useState({
    feedbackMessage: "",
    feedbackStatus: "not pressed"
  });

  const [yamlPreview, setYamlPreview] = useState({
    portNumber: {value: ''},
    replicas: {value: ''},
    dockerImage: {value: ''},
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name], value
      }
    })

    setYamlPreview({
      ...yamlPreview,
      [name]:{
        ...yamlPreview[name], value
      }
    })
  };

  const handlePostYaml = async (e) => {
    e.preventDefault();
    let errorThrown = false;

    // Perform form validation here
    const yamlValidationString = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
    let newFormValues = {...formValues};
    
    // Reset all fields error status back to false
    for (let field in newFormValues) {
        newFormValues[field].error = false;
    };

    // FORM VALIDATION checking for correct data types for each field
    if (!yamlValidationString.test(newFormValues.deploymentName.value) || newFormValues.deploymentName.value === '') {
        newFormValues.deploymentName.error = true;
        errorThrown = true;
    };
    if (!yamlValidationString.test(newFormValues.labelNames.value) || newFormValues.labelNames.value === '') {
        newFormValues.labelNames.error = true;
        errorThrown = true;
    };
    if (typeof newFormValues.dockerImage.value !== 'string') {
        newFormValues.portNumber.error = true;
        errorThrown = true;
    };
    if (newFormValues.portNumber.value < 1 || newFormValues.portNumber.value > 65535) {
        newFormValues.portNumber.error = true;
        errorThrown = true;
    };
    if (newFormValues.replicas.value < 1) {
        newFormValues.replicas.error = true;
        errorThrown = true;
    };

    // set form state to be newFormValues obj => update error status for fields
    setFormValues(newFormValues);
    
    // console.log(typeof newFormValues.replicas.value)

    // don't make POST request if we have an error for any of the fields
    if(!errorThrown) {
      const yamlObj = {
        clusterName: newFormValues.deploymentName.value,
        replicas: Number(newFormValues.replicas.value),
        image: newFormValues.dockerImage.value,
        port: Number(newFormValues.portNumber.value),
        label: newFormValues.labelNames.value
      };        
      // console.log(yamlObj);

      try {
        const postYaml = await fetch('/api/yaml', {
          method: "POST",
          mode: "cors",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(yamlObj)
        });

        const jsonRes = await postYaml.json();
        // console.log(postYaml.status);
        // console.log(jsonRes);
        
        // Make a copy of previous state for button feedback
        const prevState = {...buttonFeedback};

        // If successful, generate YAML on the backend
        // Set rendered feedback message
        if(postYaml.status === 200) {
          prevState.feedbackMessage = <Alert severity="success">YAML file generated successfully!</Alert>
          prevState.feedbackStatus = "success"
        } else {
          prevState.feedbackMessage = <Alert severity="error">YAML failed to generate T.T</Alert>
          prevState.feedbackStatus = "failure"
        };
        setButtonFeedback(prevState);

      } catch(err) {
        console.log(`ERROR : ${err}`);
      };
          
      } else {
        console.log("POST request NOT made");
      };
    };

  const handleDeploy = async () => {
    try {
        const deployYaml = await fetch('/api/deploy');
        const resDeploy = await deployYaml.json();
        // console.log(deployYaml.status);
        // console.log(resDeploy);

      const prevState = {...buttonFeedback};
      // handle button feedback here (based on status code)
        // use setButtonPressed
        // set button + buttonFeedback string
      if(deployYaml.status === 200) {
        prevState.feedbackMessage = <Alert severity="success">Deployment successful!</Alert>
        prevState.feedbackStatus = "success"
      } else {
        prevState.feedbackMessage = <Alert severity="error">Deployment failed.</Alert>
        prevState.feedbackStatus = "failure"
      };
      // console.log(prevState)
      setButtonFeedback(prevState);

    } catch(err) {
        console.log(`ERROR: ${err}`);
    };
  };

    const handleExpose = async () => { 
      try {
          const exposeYaml = await fetch('/api/expose')
          const resExpose = await exposeYaml.json();
          console.log('EXPOSURE RESULTS', resExpose);

      const prevState = {...buttonFeedback};
      // handle button feedback here (based on status code)
        // use setButtonPressed
        // set button + buttonFeedback string
      if(exposeYaml.status === 200) {
        prevState.feedbackMessage = <Alert severity="success">Cluster exposed successfully!</Alert>
        prevState.feedbackStatus = "success"
      } else {
        prevState.feedbackMessage = <Alert severity="error">Failed to expose cluster.</Alert>
        prevState.feedbackStatus = "failure"
      };
        // console.log(prevState)
        setButtonFeedback(prevState);
    } catch(err) {
        console.log(`ERROR: ${err}`);
    };
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container className='form-main-container' spacing={2}>
    <Grid item xs={8} id='form' >
      <div className='form-header'>
        <strong>Launch Kubernetes with InKubator!</strong>
      </div>
    
      <div id='form-div1' className='form-section-header'>
        <strong>Deployment details</strong>
      </div>
        
      <div className='form-div2'>
      <p>Deployment kind</p>
      {/* This is a drop down menu */}
      <TextField
        id='outlined-select-deployment-kind'
        select 
        label='Select'
        defaultValue='Deployment'
      >
        {deploymentKinds.map((option) => (
          <MenuItem key={option.value} value={option.value}>
              {option.label}
          </MenuItem>
        ))}
      </TextField>
  
      <p>Deployment name <Tooltip placement='right' title='Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.'><InfoOutlined/></Tooltip></p>
        <TextField 
          id='deploymentName' 
          label='Deployment name' 
          name='deploymentName'
          variant='outlined'
          onChange={handleChange}
          value={formValues.deploymentName.value}
          error={formValues.deploymentName.error}
          helperText={formValues.deploymentName.error && formValues.deploymentName.errorMessage}
          // onChange={(e) => handleInputChange(e, setDeploymentName)}
        />
          
      <p>Labels <Tooltip placement='right' title='Labels are custom key/value pairs that are assigned to Kubernetes resources. The labels defined in the Deployment section are applied to the Deployment, Pod, Service, Ingress, ConfigMap and Secret resources.'><InfoOutlined/></Tooltip></p>
        <TextField 
          id='deploymentName' 
          label='Label'
          variant='outlined' 
          name='labelNames'
          onChange={handleChange}
          value={formValues.labelNames.value}
          error={formValues.labelNames.error}
          helperText={formValues.labelNames.error && formValues.labelNames.errorMessage}
          // onChange={(e) => handleInputChange(e, setClusterLabel)}
        />
        </div>
        
        <div id='form-div3' className='form-section-header'>
            <strong>Pod details</strong>
        </div>
        
        <div className='form-div4'>
          <p>Docker image <Tooltip placement='right' title='If you do not have a containerized app, let us deploy a sample app for you. You can leave this field empty.'><InfoOutlined/></Tooltip></p>
          <TextField
            id='dockerImage'
            label='Docker image' 
            name='dockerImage'
            variant='outlined'
            onChange={handleChange}
            error={formValues.dockerImage.error}
            helperText={formValues.dockerImage.error && formValues.dockerImage.errorMessage}
          />
          
          <p>Port number <Tooltip placement='right' title='The port number must be a number between 1 and 65535. NOTE: The port MUST match the port defined in your Docker image. If you do not have a Docker image leave this field empty. Port number will default to 8080 if left blank.'><InfoOutlined/></Tooltip></p>
          <TextField
            id='containerPort'
            label='Port Number'
            name='portNumber'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: { min: 1, max: 65535 },
            }}
            style={{ width: '150px' }} // Adjust the width as needed

            onChange={handleChange}
            // value={formValues.portNumber.value}
            error={formValues.portNumber.error}
            helperText={formValues.portNumber.error && formValues.portNumber.errorMessage}
            // onChange={(e) => handleInputChange(e, setContainerPort, true)}
          />
  
          <p>Number of replicas <Tooltip placement='right' title='The desired number of Pod resources is set in the Replicas field.'><InfoOutlined/></Tooltip></p>
          <TextField
            id='numReplicas' 
            label='Number of replicas'
            name='replicas'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: { min: 1 },
            }}

            onChange={handleChange}
            value={formValues.replicas.value}
            error={formValues.replicas.error}
            helperText={formValues.replicas.error && formValues.replicas.errorMessage}
            // onChange={(e) => handleInputChange(e, setNumReplicas, true)}
          />
          
          <br />
          <p style={{ 
            fontStyle: 'italic',
            color: buttonFeedback.feedbackStatus === 'success' ? 'green' : 'red'
          }}>
            {buttonFeedback.feedbackMessage}</p>
      </div>

      <div className='form-footer'>
        <Button id='yaml-button' color='purple' variant='outlined' onClick={(e) => {handlePostYaml(e)}}>Generate YAML</Button>
        <Button id='expose-button' color='purple' variant='outlined' onClick={(e) => {handleExpose(e)}}>Expose</Button>
        <Button id='deploy-button' color='purple' variant='contained' onClick={(e) => {handleDeploy(e)}}>Deploy</Button>
        <RouterLink to='/deploymentlist'><Button color='purple' variant='contained'>See deployments</Button></RouterLink>
        {/* If successful, display alert HERE */}
        {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
        {/* If failed, display alert HERE */}
        {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
      </div>
    </Grid>
    <Grid item xs={4}>
      <YamlGenerator id='yaml-preview' formValues={formValues} setFormValues={setFormValues} yamlPreview={yamlPreview} setYamlPreview={setYamlPreview}/>
    </Grid>
  </Grid>
  </ThemeProvider>
  )
}

export default Form;