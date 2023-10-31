import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Breadcrumbs } from "@mui/material";

import LandingPage from '../components/LandingPage';
import SetupContainer from "../components/SetupContainer";

const HomePage = ({ setDeploymentEnvironment, deploymentEnvironment }) => {
  return (
    <>
      <div id='homepage-container'>
        <LandingPage deploymentEnvironment={deploymentEnvironment} setDeploymentEnvironment={setDeploymentEnvironment} />
        <SetupContainer deploymentEnvironment={deploymentEnvironment} />
      </div>
    </>
  )
}

export default HomePage;