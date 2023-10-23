import React from 'react';
import { Tabs, Tab } from '@mui/material';

const Navigation = ({ sections, activeSection, handleSectionChange }) => {
  return (
    <Tabs 
      value={activeSection} 
      onChange={handleSectionChange} 
      orientation='vertical' 
      scrollButtons="auto"
    >
    {/* Not sure what this does */}
      {sections.map((section, index) => (
        <Tab 
          label={section} 
          key={index} />
      ))}
    </Tabs>
  )
};

export default Navigation;