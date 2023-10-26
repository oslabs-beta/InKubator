import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CloudSetup from './components/CloudSetup';
import MinikubeSetup from './components/MinikubeSetup';

import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import DeploymentPage from './pages/DeploymentPage';

import { Routes, Route, Switch } from 'react-router-dom';

// Page 1 => LandingPage + CloudSetup / MinikubeSetup

  // Continue button @ the bottom

    // if(cloud)
      // render <TestForm> (which renders <Clusters>) + <Form>
    // else (minikube)
      // render only <Form>

// Page 2 => TestForm (which renders Clusters) + Form

  // View Deployments button @ the bottom

// Page 3 => DeploymentList (is not yet created)


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

/**
 * 
 *  -naming convention of routes ('/home' or something?)
 *  -separating things into separate folders with pages, components, etc. => make new presentational/stateful components??
 * 
 *  (Questions):
 * 
 *  -ask Tarik if he's using the TestForm component to still render his frontend get/set cluster stuff
 *  -ask everyone about folders, organizing things into a better system (it's going to need to change)
 *  -ask Rita about what the DeploymentList page/component is going to look like
 * 
 */