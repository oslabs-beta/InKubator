import React from 'react';
import CloudSetup from './CloudSetup';
import MinikubeSetup from './MinikubeSetup';

const EnvironmentSetupContainer = ({ deploymentEnvironment }) => {
  return (
    <div id='setup' className='section setup'>
        {deploymentEnvironment === 'cloud' ? <CloudSetup /> : <MinikubeSetup />}    
    </div>
  )
};

export default EnvironmentSetupContainer;