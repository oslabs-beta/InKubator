import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CloudSetup from './components/CloudSetup';
import MinikubeSetup from './components/MinikubeSetup';


const App = () => {
  const [deploymentEnvironment, setDeploymentEnvironment] = useState('cloud');

  return (
    <div>
      <LandingPage setDeploymentEnvironment={setDeploymentEnvironment} />
      {deploymentEnvironment === 'cloud' ? <CloudSetup /> : <MinikubeSetup />}
    </div>
  );
};

export default App;