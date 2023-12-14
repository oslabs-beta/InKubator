import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DeploymentProvider } from './components/DeploymentContext.jsx';

import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import DeploymentPage from './pages/DeploymentPage';
import AuthTest from './pages/AuthTest.jsx';


const App = () => {
  return (
    <>
    <DeploymentProvider>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/form' element={<FormPage />}/>
        <Route path='/deploymentlist' element={<DeploymentPage />}/>
      </Routes>
    </DeploymentProvider>
    </>
  );

  // return (
  //   <AuthTest/>
  // )
};

export default App;