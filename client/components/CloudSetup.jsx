import React from 'react';
import { Button, IconButton } from '@mui/material';
import { FileCopy, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Link, animateScroll as scroll } from 'react-scroll';

const CloudSetup = () => {

  // Code for copy to clipboard functionality
  const cloudStartCode = 'cloud start';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloudStartCode)
      .then(() => {
        alert('Copied to clipboard!');
      });
  };
  
  return (
    <div className='section minikube-setup'>
      <Link 
        class='nav-button'
        to='landing'
        spy={true}
        smooth={true}
        offset={-20}
        duration={900} 
      >
        <IconButton>
          <KeyboardArrowUp />
        </IconButton>
      </Link>
      <h1>Deploy Kubernetes cluster with GOOGLE CLOUD</h1>

      <p>Before getting started, you'll need:</p>
        <ul>Minikube installed on your machine</ul>
        <ul>A container or virtual machine manager</ul>

      <h2>Set up your container</h2>
        <p>We support Docker, Hyperkit, etc. All you'll need is the name of your container.</p>

      <h2>Install Minikube</h2>
        <p>Click here for instructions on how to install.</p>

      <h2>Start Minikube</h2>
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
    
    </div>
  )
};

export default CloudSetup;