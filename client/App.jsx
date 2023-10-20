import React, { useState } from 'react'
import Form from './components/Form';
import { Tabs, Tab } from '@mui/material';
import TestForm from './components/TestForm';
// import minikube_logo from './assets/minikube_logo.png';

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    // console.log(e)
    // console.log(tabIndex);
    setCurrentTab(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label='Minikube' />
        <Tab label='Cloud' />
      </Tabs>
      {currentTab === 0 && (<Form/>)}
      {currentTab === 1 && (<TestForm/>)}
    </React.Fragment>
    // {/* <Form /> */}
  );
};

export default App;