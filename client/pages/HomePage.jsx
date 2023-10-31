import React from "react";
import { useDeployment } from '../components/DeploymentContext.jsx'

import LandingPage from '../components/LandingPage';
import CloudSetup from "../components/CloudSetup";
import MinikubeSetup from "../components/MinikubeSetup";

const HomePage = () => {
  const { deploymentEnvironment, setDeploymentEnvironment } = useDeployment();

  const handleEnvironmentChange = (environment) => {
    setDeploymentEnvironment(environment);
  };

  return (
    <>
      <div id='homepage-container'>
        <LandingPage handleEnvironmentChange={handleEnvironmentChange} />
      </div>
      
      <div className='setup-container' id='setup-container'>
        {deploymentEnvironment === '' ? null : (deploymentEnvironment === 'cloud' ?  <CloudSetup /> : <MinikubeSetup />)}    
      </div>
    </>
  )
}

export default HomePage;