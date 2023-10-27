import React, { useState } from "react";
import { Button, IconButton, Typography } from '@mui/material';
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
    <div className="cloud">
      <Link 
        to='landing'
        class='nav-button'
        spy={true}
        smooth={true}
        // offset={-20}
        duration={900} 
      >
        <IconButton>
          <KeyboardArrowUp />
        </IconButton>
      </Link>
      <h1>Deploy Kubernetes cluster with GOOGLE CLOUD</h1>

      <h2>Before getting started, you will need:</h2>
        <li>Google Cloud CLI installed on your Computer</li>
        <li>Google Cloud authentication plugin</li>
        <li>A containerized application</li>

      <h3>Install Google Cloud CLI</h3>
        <a href='https://cloud.google.com/sdk/docs/install'>Click here for instructions on how to install.</a>

      <h3>Install the Authentication Plugin</h3>
        <p>Run this command in your terminal to get started.</p>
        <div class='code-snippet'>
          <pre>{cloudStartCode}</pre>
            <Button
              variant='outlined'
              onClick={copyToClipboard}
              startIcon={<FileCopy />} >
              Copy
            </Button>
        </div>

      <h3>A Containerized Application</h3>
        <p>Have the link to your containerized application ready</p>
        <p>We support Dockerhub, Google Container Registry, etc.</p>
        <p>To containerize your application, you can use something like <a href='https://docs.docker.com/get-docker/'> Docker </a></p>

      <h3> Ready to go? Select your cluster to begin: </h3>

      <Link class='nav-button'
        to='form'
        spy={true}
        smooth={true}
        offset={-20}
        duration={900} >
        <IconButton>
          <KeyboardArrowDown />
        </IconButton>
      </Link>
      
      <Button><RouterLink to='/form'>Continune to Form Page</RouterLink></Button>
    </div>

  );
};

export default CloudSetup;