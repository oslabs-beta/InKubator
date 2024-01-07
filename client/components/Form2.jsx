import React, { useState } from 'react';
import { Alert, Card, Grid, Button, MenuItem, IconButton, TextField, Tooltip, Typography, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { InfoOutlined } from "@mui/icons-material";
import YamlGenerator from './YamlGenerator';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const Form2 = ({ selectedCluster }) => {
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
            const postYaml = await fetch('api/yaml', {
              method: "POST",
              mode: "cors",
              headers: {"Content-Type": "application/json",},
              body: JSON.stringify(yamlObj)
            });

            const jsonRes = await postYaml.json();
            // console.log(postYaml.status);
            // console.log(jsonRes);
            
            // make a copy of previous state for button feedback
            const prevState = {...buttonFeedback};

            // if successful YAML generation from a endpoint
            // set rendered feedback message => YAML file generated successfully
            if(postYaml.status === 200) {
              prevState.feedbackMessage = <Alert severity="success">YAML file generated successfully!</Alert>
              prevState.feedbackStatus = "success"
            } else {
              prevState.feedbackMessage = <Alert severity="error">YAML failed to generate T.T</Alert>
              prevState.feedbackStatus = "failure"
            };
            // console.log(prevState)
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

  // CRISTINA NEW ADDITIONS
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formSteps = [
    {
      label: 'Deployment details',
      description: 
        <Card className='form-sections-paper'>
          <TextField
            select 
            id='outlined-select-deployment-kind'
            label='Select kind'
            defaultValue='Deployment'
            size='small'
            margin="normal"
            style={{ width: '200px' }} 
          >
            {deploymentKinds.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                  {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField 
            id='deploymentName' 
            label='Deployment name' 
            name='deploymentName'
            variant='outlined'
            size='small'
            margin="normal"
            style={{ width: '200px' }} 
            onChange={handleChange}
            value={formValues.deploymentName.value}
            error={formValues.deploymentName.error}
            helperText={formValues.deploymentName.error && formValues.deploymentName.errorMessage}
          />
          <TextField 
            id='deploymentName' 
            label='Label'
            name='labelNames'
            variant='outlined' 
            size='small'
            margin="normal"
            style={{ width: '200px' }} 
            onChange={handleChange}
            value={formValues.labelNames.value}
            error={formValues.labelNames.error}
            helperText={formValues.labelNames.error && formValues.labelNames.errorMessage}
          />
        </Card>
    },
    {
      label: 'Pod details',
      description: 
        <Card className='form-sections-paper'>
          <TextField
            required
            defaultValue={'nginx:latest'}
            id='dockerImage'
            label='Docker image path' 
            name='dockerImage'
            variant='outlined'
            size='small'
            margin="normal"
            onChange={handleChange}
            error={formValues.dockerImage.error}
            helperText={'If you do not have a containerized app, let us deploy a sample app for you. You can leave this field empty.'}
          />
          <TextField
            id='containerPort'
            label='Port Number'
            name='portNumber'
            variant='outlined'
            size='small'
            margin="normal"
            type='number'
            InputProps={{
              inputProps: { min: 1, max: 65535 },
            }}
            onChange={handleChange}
            error={formValues.portNumber.error}
            helperText='The port number must be a number between 1 and 65535. NOTE: The port MUST match the port defined in your Docker image. Port number will default to 8080 if left blank.'
          />
          <TextField
            id='numReplicas' 
            label='Number of replicas'
            name='replicas'
            variant='outlined'
            type='number'
            size='small'
            margin="normal"
            InputProps={{
              inputProps: { min: 1 },
            }}
            onChange={handleChange}
            value={formValues.replicas.value}
            error={formValues.replicas.error}
          />
        </Card>
    },
    {
      label: 'Expose',
      description: 
        <Card className='form-sections-paper'>
          <Button id='yaml-button' color='purple' variant='outlined' onClick={(e) => {handlePostYaml(e)}}>Generate YAML</Button>
          <Button id='expose-button' color='purple' variant='outlined' onClick={(e) => {handleExpose(e)}}>Expose</Button>
          <Button id='deploy-button' color='purple' variant='contained' onClick={(e) => {handleDeploy(e)}}>Deploy</Button>
          <RouterLink to='/deploymentlist'><Button color='purple' variant='contained'>See deployments</Button></RouterLink>
        </Card>
    }
  ];

  return (
    <ThemeProvider theme={theme}>
    <Grid item xs={8} id='form' >
      <div className='form-header'>
        <strong>New deployment to {selectedCluster}</strong>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {formSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {step.description}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === formSteps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
  
      <p style={{ 
        fontStyle: 'italic',
        color: buttonFeedback.feedbackStatus === 'success' ? 'green' : 'red'
      }}>
        {buttonFeedback.feedbackMessage}
      </p>
    </Grid>
  </ThemeProvider>
  )
}

export default Form2;