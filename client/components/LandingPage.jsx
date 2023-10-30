import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import googleCloudLogo from '../assets/google-cloud-logo-full.png'
import minikubeLogo from '../assets/minikube-logo-full.png';

const LandingPage = ({ setDeploymentEnvironment }) => {
  return ( 
    <div className='landing'>

      <Box id='landing-header-container'>
        <p id='landing-header-title'>Inkubator</p>
        <p id='landing-header-text'>Deployment made simple.</p>
      </Box>

      <Box id='landing-page-body-container'>
        <p id='landing-body-text' >Where are you deploying?</p>
      </Box>

      <div id='landing-page-button-container'>

        {/* MINIKUBE CONTAINER */}
        <div class='landing-page-buttons'>
        <Link
          to="setup-container"
          activeClass="active"
          spy={true}
          smooth={true}
          duration={900}
        >
          <Button class='landing-page-button'>
            <img
              src={minikubeLogo}
              alt="minikube-logo"
              height="65"
              onClick={() => {
                console.log('button clicked!')
                setDeploymentEnvironment('minikube')
              }} 
            />
          </Button>
        </Link>
        </div>

        {/* CLOUD CONTAINER */}
        <div class='landing-page-buttons'>
          <Link 
            to="setup-container"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={900} 
          >
            <Button class='landing-page-button'>
              <img 
                src={googleCloudLogo} 
                alt="gcloud-logo" 
                height="55"
                onClick={() => setDeploymentEnvironment('cloud')}/>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;