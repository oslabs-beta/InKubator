import React, { useState } from "react";

import { Link } from 'react-router-dom';

import LandingPage from '../components/LandingPage';
import CloudSetup from '../components/CloudSetup';
import MinikubeSetup from '../components/MinikubeSetup';

const HomePage = ({ setDeploymentEnvironment, deploymentEnvironment }) => {
  return (
    <>
      <LandingPage setDeploymentEnvironment={setDeploymentEnvironment} />
      {deploymentEnvironment === 'cloud' ? <CloudSetup /> : <MinikubeSetup />}
    </>
  )
}

export default HomePage;