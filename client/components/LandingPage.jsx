import React from 'react';
import { Button } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import googleCloudLogo from '../assets/google_cloud_logo.png'
import minikubeLogo from '../assets/minikube_logo.png';

const LandingPage = ({ setDeploymentEnvironment }) => {
  return ( 
      <div className='landing'>

        <div id='landing-page-header-container'>
          <p>Welcome to Kuberneggies</p>
          <p>A developer tool that simplifies Kubernetes cluster deployment.</p>
        </div>

        <div id='landing-page-body-container'>
          <p>Where are you deploying?</p>
        </div>

        <div id='landing-page-button-container'>

          {/* MINIKUBE CONTAINER */}
          <div class='landing-page-buttons'>
          <Link 
            to="minikube"
            activeClass="active"
            spy={true}
            smooth={true}
            // offset={-2000}
            duration={900} 
          >
          <Button class='landing-page-button'>
            <img 
              src={minikubeLogo}
              alt="minikube-logo"
              height="100"
              onClick={() => setDeploymentEnvironment('minikube')} />
          </Button>
          </Link>
            <p>Deploy to Minikube!</p>
          </div>

          {/* CLOUD CONTAINER */}
          <div class='landing-page-buttons'>
            <Link 
              to="cloud"
              activeClass="active"
              spy={true}
              smooth={true}
              // offset={-2000}
              duration={900} 
            >
              <Button class='landing-page-button'>
                <img 
                  src={googleCloudLogo} 
                  alt="gcloud-logo" 
                  height="100"
                  onClick={() => setDeploymentEnvironment('cloud')}/>
              </Button>
            </Link>

            <p>Deploy to Google Cloud!</p>
            
          </div>

        </div>

      </div>
  )
};

export default LandingPage;