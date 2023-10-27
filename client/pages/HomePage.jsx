import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Breadcrumbs } from "@mui/material";

import LandingPage from '../components/LandingPage';
import CloudSetup from '../components/CloudSetup';
import MinikubeSetup from '../components/MinikubeSetup';

const HomePage = ({ setDeploymentEnvironment, deploymentEnvironment }) => {
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/">
        Landing
      </Link>
    </Breadcrumbs>
      <LandingPage setDeploymentEnvironment={setDeploymentEnvironment} />
      {deploymentEnvironment === 'cloud' ? <CloudSetup /> : <MinikubeSetup />}
    </>
  )
}

export default HomePage;