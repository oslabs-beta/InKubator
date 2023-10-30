import React, { useState } from 'react';

import LandingPage from './components/LandingPage';
import CloudSetup from './components/CloudSetup';
import MinikubeSetup from './components/MinikubeSetup';
import Form from './components/Form';


import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import DeploymentPage from './pages/DeploymentPage';
import YamlGenerator from './components/YamlGenerator';


import { Routes, Route, Switch } from 'react-router-dom';

const App = () => {
  const [deploymentEnvironment, setDeploymentEnvironment] = useState('');

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage setDeploymentEnvironment={setDeploymentEnvironment} deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/form' element={<FormPage deploymentEnvironment={deploymentEnvironment} />}/>
      <Route path='/deploymentlist' element={<DeploymentPage />}/>
    </Routes>
    </>
  );

  // return (
  //   <Form />
  // )
};

export default App;