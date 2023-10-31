import React from 'react';
import CloudSetup from '../components/CloudSetup';
import MinikubeSetup from '../components/MinikubeSetup';

const SetupContainer = ({ deploymentEnvironment }) => {
  return (
    <div className='setup-container' id='setup-container'>
      {deploymentEnvironment === '' ? null : (deploymentEnvironment === 'cloud' ?  <CloudSetup /> : <MinikubeSetup />)}    
    </div>
  )
};

export default SetupContainer;