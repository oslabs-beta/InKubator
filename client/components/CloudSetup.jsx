import React, { useState } from "react";
import { Box, Button, Chip, Grid, IconButton, Paper, Typography } from '@mui/material';
import { FileCopy, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import Clusters from './Clusters'
import Form from './Form';

import { Link as RouterLink } from 'react-router-dom';

const CloudSetup = () => {
  const [clusters, setClusters] = useState();
  const [clusterName, setClusterName] = useState(null);
  const [clusterStatus, setClusterStatus] = useState();
  const [getCreds, setGetCreds] = useState(false);

  // Reusable Fetch request function
  const fetchRequest = async (endpoint, method, card) => {
    // If no "method" is passed, it uses this default header
    let defaultHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
        };
        // if a method is is passed, it updates the default header
    let header = Object.assign({}, defaultHeader, method);

    const result = await fetch(`${endpoint}`, header)
        .then((data) => data.json())
        // .then((data) => console.log('DATA', data))
        .catch((err) => console.error(err))
    return result;
}

// Handle Clicks for Getting Clusters, and tying credentials to KubeCTL
const handleGetClusters = async (e) => {
  const allClusters = await (fetchRequest('http://localhost:3001/google/getClusters',{method: "POST"}));
  await console.log('allClusters', allClusters)
  await setClusters(allClusters)
}

const handleGetCredentials = async (e) => {
  const credsAreTied = await (fetchRequest('http://localhost:3001/google/getCredentials', {method: "POST"}, {"clusterName": clusterName}))
  await setGetCreds(credsAreTied)
}
  // Code for copy to clipboard functionality
  const cloudStartCode = 'gcloud components install gke-gcloud-auth-plugin';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloudStartCode)
      .then(() => {
        alert('Copied to clipboard!');
      });
  };
  
  return (
    <div className='cloud' id='cloud-setup-instructions'>
      <Link 
        to='landing'
        class='nav-button'
        spy={true}
        smooth={true}
        duration={900} 
      >
        <IconButton>
          <KeyboardArrowUp />
        </IconButton>
      </Link>
      <h1>Deployments with Google Cloud</h1>
      
      <div class='setup-requirements'>
        <h3>Before getting started, you'll need:</h3>
          <ol>
            <li>Google Cloud CLI installed on your computer</li>
            <li>Kubectl authentication for your Google Cloud account</li>
            <li>A containerized application</li>
          </ol>
      </div>

      <Paper className='setup-paper' square={false} elevation={1} >
        <h3><Chip label='1' />  Installing the Google Cloud CLI on your machine</h3>
        <p>Visit the Google Cloud <a href='https://cloud.google.com/sdk/docs/install'>documentation</a> for installation instructions.</p>
      </Paper>

      <Paper className='setup-paper' square={false} elevation={1}>
        <h3><Chip label='2' />  Installing the Kubectl authentication plugin</h3>
          <p>Run this command in your terminal to get started:</p>
          <div class='code-snippet'>
            <pre>{cloudStartCode}</pre>
            <Button
              variant='outlined'
              onClick={copyToClipboard}
              startIcon={<FileCopy />} 
              size='small'>
            </Button>
          </div>
          <p>Learn more about this command <a href='https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke'>here</a>!</p>
      </Paper>

      <Paper className='setup-paper' square={false} elevation={1}>
        <h3><Chip label='3' /> Setting up your containerized application</h3>
        <p>Have the link to your containerized application ready</p>
        <p>We support Dockerhub, Google Container Registry, etc.</p>
        <p>To containerize your application, you can use something like <a href='https://docs.docker.com/get-docker/'> Docker </a></p>
      </Paper>

      <div class='setup-footer'>
        <h3> Ready to deploy?</h3>
        {/* <Button variant='contained'>
          <RouterLink to='/form'>Let's go!</RouterLink>
        </Button> */}
        <RouterLink to='/form'>
          <Button variant='contained'>
            Let's go!
          </Button>
        </RouterLink>

      </div>
    </div>

  );
};

export default CloudSetup;