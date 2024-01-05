import React, { useEffect, useState } from "react";
import { Button, Chip, Grid, IconButton, Tooltip, Stack, Fab, Box } from '@mui/material';
import { ContentCopy, KeyboardArrowUp } from '@mui/icons-material';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import googleCloudFloating from '../assets/google-cloud-floating.png'
import Clusters from './Clusters'
import Form from './Form';

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    purple: {
      main: '#8870E0',
      light: '#e2e5fa',
      contrastText: '#fff'
    },
  },
  // shape: {
  //   borderRadius: 30,
  // }
});

const CloudSetup = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  // Reusable fetch request function
  const fetchRequest = async (endpoint, method, card) => {
    // If no "method" is passed, it uses this default header
    let defaultHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
        };
    // If a method is is passed, it updates the default header
    let header = Object.assign({}, defaultHeader, method);

    const result = await fetch(`${endpoint}`, header)
        .then((data) => data.json())
        .catch((err) => console.error(err))

    return result;
  }

  // Handle clicks for getting clusters, and tying credentials to KubeCTL
  const handleAuth = async (e) => {
    await (fetchRequest('google/test', {method: "POST"}));
    await setLoggedIn(true);
  }

  // Handle copy to clipboard 
  const cloudStartCode = 'gcloud components install gke-gcloud-auth-plugin';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloudStartCode)
      .then(() => {
        setIsCopied(true);
      });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container className='cloud' id='cloud-setup-instructions'>
      {/* top of container */}
      <Grid item xs={12} className='setup-header'>
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
      </Grid>

      <Grid item className='setup-img-container' xs={5}>
        <img src={googleCloudFloating} className='setup-img'/>
      </Grid>

      <Grid item xs={7} className='setup-content'>
        
        <div className='setup-requirements'>
        <h1>Kubernetes deployments with Google Cloud</h1>
          <h3>Before getting started, you'll need:</h3>
            <ol>
              <li>Google Cloud CLI installed on your computer</li>
              <li>Kubectl authentication for your Google Cloud account</li>
              <li>A containerized application</li>
            </ol>
        </div>

        <Grid className='setup-paper'>
          <h3>1. Installing the Google Cloud CLI on your machine</h3>
          <p>Visit the Google Cloud <a href='https://cloud.google.com/sdk/docs/install'>documentation</a> for installation instructions.</p>
        </Grid>

        <Grid className='setup-paper'>
          <h3>2. Installing the Kubectl authentication plugin</h3>
            <p>Run this command in your terminal to get started:</p>
            <div class='code-snippet'>
              <pre>{cloudStartCode}</pre>
              <Tooltip title={isCopied ? 'Copied!' : 'Copy'} >
                <IconButton onClick={copyToClipboard} style={{ color: '#272a36' }}>
                  <ContentCopy/>
                </IconButton>
              </Tooltip>
            </div>
            <p>Learn more about this command <a href='https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke'>here</a>!</p>
        </Grid>

        <Grid className="setup-paper">
          <Box justifyContent={"center"}>
            <Fab variant="extended" onClick={handleAuth}>
              Authenticate!
            </Fab>
          </Box>
        </Grid>

        <Grid className='setup-paper'>
          <h3>3. Setting up your containerized application</h3>
          <p>Have the link to your containerized application ready</p>
          <p>We support Dockerhub, Google Container Registry, etc.</p>
          <p>To containerize your application, you can use something like <a href='https://docs.docker.com/get-docker/'> Docker </a></p>
        </Grid> 

      </Grid>

      <Grid item xs={12} className='setup-footer'>
        <Stack justifyContent='center' alignItems='center'>
          <p id='ready-to-deploy'> Ready to deploy?</p>
          <RouterLink to='/form'>
            <Button variant='contained' color='purple' size='large'>
              Let's go!
            </Button>
          </RouterLink>
        </Stack>
      </Grid>

    </Grid>
    </ThemeProvider>
  );
};

export default CloudSetup;