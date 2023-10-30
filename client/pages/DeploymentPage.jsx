import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Stack, Paper, Typography, Link, Breadcrumbs } from '@mui/material';

const DeploymentPage = () => {
  const [deploymentStats, setDeploymentStats] = useState({});

  //Default deployment object
  let deplObjConstruct = {
    deployment: {
      name: 'name',
      pods: '0/0',
      image: 'image',
    },
    replicas: {
      name: 'name',
      pods: '0/0',
    },
    pods: [],
  };

  //Helper function that converts output string to object for DEPLOYMENT
  const helperDeploymentObject = (str) => {
    //Convert to array and remove spaces and empty strings
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    //Remove auto-generated fields
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);

    //Assuming this function receives only one deployment at a time
    deplObjConstruct.deployment.name = strToArr[0];
    deplObjConstruct.deployment.pods = strToArr[1];
    deplObjConstruct.deployment.image = strToArr[6];
    deplObjConstruct.replicas.pods = strToArr[1];
  };

  //Helper function that converts output string to object for PODS
  const helperPodsObject = (str) => {
    //Convert to array, remove spaces and empty strings, remove non-applicable fields
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);
    
    //Get replica name
    let replicaName = strToArr[0].split('-').slice(0, 2).join('-');
    deplObjConstruct.replicas.name = replicaName;
    
    //Iterate to store pod information in pods array of objects
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
    const fetchDeployment = await fetch('http://localhost:3001/status/getDeployment');
    const deploymentInfo = await fetchDeployment.json();
    helperDeploymentObject(deploymentInfo);

    const fetchPods = await fetch('http://localhost:3001/status/getPods');
    const podsInfo = await fetchPods.json();
    helperPodsObject(podsInfo);

    setDeploymentStats(deplObjConstruct);
  };

  useEffect(() => {
    getStats();
  }, [])

  console.log('DEPLOYMENT STATS: ', deploymentStats);

  let deplInfoRender = [];
  for (let keyDepl in deploymentStats.deployment) {
    deplInfoRender.push(<Typography variant="body1" xs={10} m={1} key={keyDepl}>{keyDepl.toUpperCase()}: {deploymentStats.deployment[keyDepl]}</Typography>);
  };

  let replicaInfoRender = [];
  for (let keyRepl in deploymentStats.replicas){
    replicaInfoRender.push(<Typography variant="body1" xs={10} m={1} key={keyRepl}>{keyRepl.toUpperCase()}: {deploymentStats.deployment[keyRepl]}</Typography>);
  };

  let podsInfoRender = deploymentStats.pods && Array.isArray(deploymentStats.pods)
  ? deploymentStats.pods.map((pod, index) => (
      <Grid container spacing={2} key={index}>

        <Grid item xs={12}>
          <Typography variant="h7">Pod {index + 1}</Typography>
        </Grid>

        {Object.keys(pod).map((key, innerIndex) => (
          <Grid item xs={3} key={innerIndex}>
            <Typography variant="body1">
              {key.toUpperCase()}: {pod[key]}
            </Typography>
        </Grid>
        ))}
        
      </Grid>
    ))
  : null;

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/">
          Landing
        </Link>
        <Link href="/form">
          Form
        </Link>
        <Typography> Deployment Page </Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="center" alignItems="center">
        <h3>Cluster Status</h3>
      </Box>

      <Grid container display="flex" justifyContent="center" alignItems="center">

        <Paper variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h7">DEPLOYMENT</Typography>
            {deplInfoRender}
            </Stack>
        </Paper>

        <Paper variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h7">REPLICAS</Typography>
            {replicaInfoRender}
            </Stack>
        </Paper>

        <Paper variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
          <Stack container direction="column" alignItems="center">
            <Typography variant="h7">PODS</Typography>
            {podsInfoRender}
          </Stack>
        </Paper>
          
      </Grid>
    </>
  )
}

export default DeploymentPage;