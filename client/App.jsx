import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CloudSetup from './components/CloudSetup';
import MinikubeSetup from './components/MinikubeSetup';

import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import DeploymentPage from './pages/DeploymentPage';

import { Routes, Route, Switch } from 'react-router-dom';

const App = () => {
  const [deploymentEnvironment, setDeploymentEnvironment] = useState('cloud');
  // potentially have deploymentEnvironment as useState in here

  // use setState inside of HomePage => LandingPage

  // prop drill deploymentEnvironment down into FormPage
    // FormPage will have conditionally rendered CloudClusters
    // and also Form

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage setDeploymentEnvironment={setDeploymentEnvironment} deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/form' element={<FormPage deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/deploymentlist' element={<DeploymentPage />}/>
    </Routes>
    </>
  );

};

export default App;