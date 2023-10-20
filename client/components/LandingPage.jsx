import React from 'react';
import minikubeLogo from '../assets/minikube_logo.png';
import googleCloudLogo from '../assets/google_cloud_logo.png'
// const minikubeLogo = require('./assets/minikube_logo.png'); 

const LandingPage = () => {

  // onClick for buttons to render forms???

  return (
    <div id='landing-page-main-container' className='section landing'>
        <div id='landing-page-header-container'>
            <p>Welcome to Kuberneggies</p>
            <p>A developer tool that simplifies Kubernetes cluster deployment.</p>
        </div>
        <div id='landing-page-body-container'>
            <p>Where are you deploying?</p>
            <div id='landing-page-button-container'>
                <div id='landing-page-minikube' class='landing-page-buttons'>
                    <button class='landing-page-button'>
                        <img src={minikubeLogo} alt="minikube-logo" height="100"/>
                    </button>
                    <p>Smth ab Minikube!</p>
                </div>
                <div id='landing-page-cloud' class='landing-page-buttons'>
                    <button class='landing-page-button'>
                        <img src={googleCloudLogo} alt="minikube-logo" height="100"/>
                    </button>
                    <p>Smth ab Cloud!</p>
                </div>
            </div>
        </div>
    </div>
  )
};

export default LandingPage;