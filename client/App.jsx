import React, { useState } from 'react'
import { Navigation } from '@mui/icons-material';
import { Link, animateScroll as scroll } from 'react-scroll';
import EnvironmentSetupContainer from './components/EnvironmentSetupContainer';
import Form from './components/form';
import LandingPage from './components/LandingPage';

const App = () => {

  const sections = ['landing', 'setup', 'test-form'];
  const [activeSection, setActiveSection] = useState('landing');
  const [deploymentEnvironment, setDeploymentEnvironment] = useState('cloud');

  // Handle changes based on scroll, passed down to Navigation
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle click on Minikube vs. Cloud button, passed down to Landing Page (which renders those buttons)
  const handleDeploymentEnvironment = (environment) => {
    setDeploymentEnvironment(environment);
  }

  return (
    <div>
      {/* Renders tabs */}
      <Navigation sections={sections} activeSection={activeSection} handleSectionChange={handleSectionChange} />

      {/* Renders sections inside each tab */}
      <LandingPage handleDeploymentEnvironment={handleDeploymentEnvironment} />
      <EnvironmentSetupContainer deploymentEnvironment={deploymentEnvironment} />
      <Form />

      {/* Not sure what this does */}
      {sections.map((section, index) => {
        <Link
          to={section}  // The target you will scroll to
          key={index}   // Corresponding index for that element
          spy={true}    // Make Link selected when scroll is at its target's position
          smooth={true} // Animates the scrolling
          offset={-70}  // To scroll additional px -- like padding
          duration={500} // Time of the scroll animation
        />
      })}

    </div>
  );
};

export default App;