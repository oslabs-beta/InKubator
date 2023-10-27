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
  );
};

export default App;