import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-scroll';
import LandingPage from './components/LandingPage';
import MinikubeSetup from './components/MinikubeSetup';
import Form from './components/Form';
// import TestForm from './components/TestForm';
import { Navigation } from '@mui/icons-material';

const App = () => {

  const sections = ['Landing', 'Setup', 'Form'];
  const [activeSection, setActiveSection] = useState('Landing');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Navigation sections={sections} activeSection={activeSection} handleSectionChange={handleSectionChange} />
      <LandingPage/>
      <MinikubeSetup/>
      <Form/>

      {/* Link component comes from react-scroll library */}
      {sections.map((section, index) => {
        <Link
          to={section} // elements in the sections array
          key={index} // corresponding index for that element
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        />
      })}
    </div>
    // <LandingPage />
    // <MinikubeSetup />
    // <React.Fragment>
    //   <Tabs value={currentTab} onChange={handleTabChange} centered>
    //     <Tab label='Minikube' />
    //     <Tab label='Cloud' />
    //   </Tabs>
    //   {currentTab === 0 && (<Form/>)}
    //   {currentTab === 1 && (<TestForm/>)}
    // </React.Fragment>
    // {/* <Form /> */}
  );
};

export default App;