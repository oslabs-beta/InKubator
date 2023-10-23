import React from 'react';
import { Button } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import minikubeLogo from '../assets/minikube_logo.png';
import googleCloudLogo from '../assets/google_cloud_logo.png'

const LandingPage = ({ handleDeploymentEnvironment }) => {
  return (
    <div id='landing' className='section landing-page'>

      <div id='landing-page-header-container'>
        <p>Welcome to Kuberneggies</p>
        <p>A developer tool that simplifies Kubernetes cluster deployment.</p>
      </div>

      <div id='landing-page-body-container'>
        <p>Where are you deploying?</p>

        <div id='landing-page-button-container'>

          {/* MINIKUBE CONTAINER */}
          <div id='landing-page-minikube' class='landing-page-buttons'>
            <Link 
              activeClass="active"
              to="setup"
              spy={true}
              smooth={true}
              offset={-20}
              duration={900} 
            >
              <Button class='landing-page-button'>
                <img 
                  src={minikubeLogo} 
                  alt="minikube-logo" 
                  height="100" 
                  onClick={() => handleDeploymentEnvironment('minikube')} />
              </Button>
            </Link>
            <p>Smth ab Minikube!</p>
          </div>

          {/* CLOUD CONTAINER */}
          <div id='landing-page-cloud' class='landing-page-buttons'>
            <Link 
              activeClass="active"
              to="setup"
              spy={true}
              smooth={true}
              offset={-20}
              duration={900} 
            >
              <Button class='landing-page-button'>
                <img 
                  src={googleCloudLogo} 
                  alt="minikube-logo" 
                  height="100" 
                  onClick={() => handleDeploymentEnvironment('cloud')}/>
              </Button>
            </Link>
            <p>Smth ab Cloud!</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;