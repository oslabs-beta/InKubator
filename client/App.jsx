<<<<<<< HEAD
import React, { useState } from 'react'
import CloudSetup from './components/CloudSetup';
import Form from './components/form';
import LandingPage from './components/LandingPage';
import MinikubeSetup from './components/MinikubeSetup';

const App = () => {

  const [deploymentEnvironment, setDeploymentEnvironment] = useState('cloud');

  return (
    <div>
      {/* Renders sections inside each tab */}
      <LandingPage setDeploymentEnvironment={setDeploymentEnvironment} />
      {deploymentEnvironment === 'cloud' ? <CloudSetup /> : <MinikubeSetup />}    
      <Form />
    </div>
=======
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

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage setDeploymentEnvironment={setDeploymentEnvironment} deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/form' element={<FormPage deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/deploymentlist' element={<DeploymentPage />}/>
    </Routes>
    </>
>>>>>>> dev
  );
};

export default App;