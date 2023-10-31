import React, { useState } from "react";

import LandingPage from '../components/LandingPage';
import CloudSetup from "../components/CloudSetup";
import MinikubeSetup from "../components/MinikubeSetup";

const HomePage = ({ setDeploymentEnvironment, deploymentEnvironment }) => {
  return (
    <>
      <div id='homepage-container'>
        <LandingPage deploymentEnvironment={deploymentEnvironment} setDeploymentEnvironment={setDeploymentEnvironment} />
      </div>
      <div className='setup-container' id='setup-container'>
        {deploymentEnvironment === '' ? null : (deploymentEnvironment === 'cloud' ?  <CloudSetup /> : <MinikubeSetup />)}    
      </div>
    </>
  )
}

export default HomePage;