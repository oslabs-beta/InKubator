import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Stack, Paper, Typography, Link, Breadcrumbs } from '@mui/material';
import { ThemeProvider, createTheme, keyframes } from '@mui/material/styles';
import clusterDetailsHeader from '../assets/cluster-details-header.png'


const theme = createTheme({
  palette: {
    purple: {
      main: '#8870E0',
      light: '#e2e5fa',
      contrastText: '#fff'
    },
  },
});


const DeploymentPage = () => {
  const [deploymentStats, setDeploymentStats] = useState({});

  //Default deployment object
  let deplObjConstruct = {
    deployment: {
      name: '',
      pods: '',
      image: '',
    },
    replicas: {
      name: '',
      pods: '',
    },
    pods: [],
  };

  // Helper function that converts output string to object for DEPLOYMENT
  const helperDeploymentObject = (str) => {
    // Convert to array and remove spaces and empty strings
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    // Remove auto-generated fields
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);
    console.log('array is ', strToArr);

    // Assuming this function receives only one deployment at a time
    if (strToArr.length > 2) {
      deplObjConstruct.deployment.name = strToArr[0];
      deplObjConstruct.deployment.pods = strToArr[1];
      deplObjConstruct.deployment.image = strToArr[6];
      deplObjConstruct.replicas.pods = strToArr[1];
    } else {
      deplObjConstruct.deployment.name = null;
      deplObjConstruct.deployment.pods = null;
      deplObjConstruct.deployment.image = null;
      deplObjConstruct.replicas.pods = null;
    }
  };

  // Helper function that converts output string to object for PODS
  const helperPodsObject = (str) => {
    // Convert to array, remove spaces and empty strings, remove non-applicable fields
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);

    // Get replica name
    let replicaName = strToArr[0].split('-').slice(0, 2).join('-');
    deplObjConstruct.replicas.name = replicaName;
    
    // Iterate to store pod information in pods array of objects
    while (strToArr.length > 1) {
      let pod = {
        name : strToArr[0],
        ready : strToArr[1],
        status : strToArr[2],
        restarts : strToArr[3],
      };
      deplObjConstruct.pods.push(pod);
      strToArr = strToArr.slice(strToArr.indexOf('\n')+ 1);
    };
  };

  const getStats = async () => {
    const fetchDeployment = await fetch('/status/getDeployment');
    const deploymentInfo = await fetchDeployment.json();
    helperDeploymentObject(deploymentInfo);

    const fetchPods = await fetch('/status/getPods');
    const podsInfo = await fetchPods.json();
    helperPodsObject(podsInfo);

    setDeploymentStats(deplObjConstruct);
  };

  useEffect(() => {
    getStats();
  }, [])

  const handleDelete = async () => {
    try {
      const deleteReq = await fetch('/status/deleteDeployment');
      const deleteRes = await deleteReq.json();
      console.log('Delete status ', deleteReq.status);
    
    } catch(err) {
      console.log(`ERROR: ${err}`);
    };
    getStats();
  }

  console.log('DEPLOYMENT STATS: ', deploymentStats);

  let deplInfoRender = [];
  for (let keyDepl in deploymentStats.deployment) {
    if (keyDepl !== 'pods') {
      deplInfoRender.push(<Typography xs={10} m={1} key={keyDepl}><strong>{keyDepl.toUpperCase()}: </strong>{deploymentStats.deployment[keyDepl]}</Typography>);                                                                    
    }
  };

  let replicaInfoRender = [];
  for (let keyRepl in deploymentStats.replicas) {
    if (keyRepl === 'pods') {
      replicaInfoRender.push(<div id='total-pods-formatted'>{deploymentStats.replicas.pods}</div>)
    }
  };

  let podsInfoRender = deploymentStats.pods && Array.isArray(deploymentStats.pods)
  ? deploymentStats.pods.map((pod, index) => (
      <Grid container id='deployment-parent-container' spacing={2} key={index} direction='row'>
        <Grid justifyContent="center" alignItems="center" item xs={12}>
          <Typography className='pod-name'><strong>Pod {index + 1}</strong></Typography>
        </Grid>

        {Object.keys(pod).map((key, innerIndex) => (
        <Grid item xs={3} key={innerIndex}>
            <Typography><strong>
              {key.toUpperCase()}: </strong>{pod[key]}
            </Typography>
        </Grid>
        ))}
        
      </Grid>
    ))
  : null;

  //Get external endpoint to access app
  const handleGetEndPoint = async () => {
    try {
      const reqEndPoint = await fetch('/google/getEndpoint');
      const endPoint = await reqEndPoint.json();
      console.log(endPoint);
      window.open(`http://${endPoint}`)
    } catch(err) {
      console.log(`ERROR at getEndPoint: ${err}`);
    };
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{paddingBottom:'12px'}}>
        <Link underline="hover" href="/">
          Landing
        </Link>
        <Link href="/form">
          Form
        </Link>
        <Typography> Deployment Page </Typography>
      </Breadcrumbs>

      <ThemeProvider theme={theme}>
        <Grid id='deployment-page-main-container'>
        <Grid id='deployment-detail-header'>
          <img src={clusterDetailsHeader} id='cluster-detail-header-img' />
        </Grid>

        <Grid container id='development-main-container'>

          <Grid item xs={8}>
            <Grid className='development-container-class' id='deployment-box' variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
              <Stack justifyContent="center" alignItems="center">
                <div className='cluster-labels-container'>
                  <Typography className='cluster-labels' variant="h7">DEPLOYMENT</Typography>
                </div>
                <div id='deployment-info-div'>
                  {deplInfoRender}
                </div>
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid className='development-container-class' id='replica-box' variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
              <Typography className='replicas-labels' variant="h7">REPLICAS</Typography>
              {replicaInfoRender}
            </Grid>
          </Grid>
            
          <Grid item xs={12} id='pods-info-container' className='development-container-class'>
            {podsInfoRender}
          </Grid>
        </Grid>

        <Grid container id='deployment-button-container' justifyContent='right'>
          <Button id='delete-button' variant='outlined' size='large' color='purple' onClick={(e) => {handleDelete(e)}}>Delete Deployment</Button>
          <Button id='get-endpoint' variant='contained' size='large' color='purple' onClick={(e) => {handleGetEndPoint(e)}}>Launch app</Button>
        </Grid>    

        </Grid>   
      </ThemeProvider>
    </>
  )
};

export default DeploymentPage;