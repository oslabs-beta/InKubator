import React, { useState } from 'react'
import Form from './components/form';
import { Tabs, Tab } from '@mui/material';
import TestForm from './components/TestForm';
// import minikube_logo from './assets/minikube_logo.png';

const App = () => {

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(e)
    console.log(tabIndex);
    setCurrentTab(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label='Deploy with Minikube' />
        <Tab label='Deploy with Cloud' />
      </Tabs>
      {currentTab === 0 && (<TestForm/>)}
      {currentTab === 1 && (<Form/>)}
    </React.Fragment>
    // {/* <Form /> */}
  );
};

export default App;