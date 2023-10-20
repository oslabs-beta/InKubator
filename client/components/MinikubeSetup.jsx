import React from 'react';
import { Button } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const MinikubeSetup = () => {

  const minikubeStartCode = 'minikube start';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minikubeStartCode)
      .then(() => {
        alert('Copied to clipboard!');
      });
  };

  return (
    <div className='section minikube-setup'>
        <h1>Deploy Kubernetes cluster with Minikube</h1>
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
            <pre>{minikubeStartCode}</pre>
            <Button
                variant='outlined'
                onClick={copyToClipboard}
                startIcon={<FileCopy/>}
            >
                Copy
            </Button>
        </div>
        {/* code snippet to copy */} 
        {/* or click here and we'll run it for you */}
    </div>
  )
};

export default MinikubeSetup;