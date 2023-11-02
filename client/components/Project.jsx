import React, { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    purple: {
      main: '#8870E0',
      light: '#e2e5fa',
      contrastText: '#fff'
    },
  },
});

const Project = ({ projectData, setSelectedProject }) => {
  // console.log('FUNCTION', props.setSelectedProject)
  // console.log('DECONSTRUCTED', PROJECT_ID, NAME, PROJECT_NUMBER)
  // console.log('projectData IN PROJECT/JSX', projectData.projectData)
  // console.log("Inside of individual project", projectData);

  const {PROJECT_ID, NAME, PROJECT_NUMBER} = projectData;

  const handleSelectProject = async () => {
    // console.log('e.target', e.target.id)
    // console.log(NAME, "SELECTED INSIDE OF PROJECT COMPONENT")
    setSelectedProject(PROJECT_ID);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='project-cards'>
        {NAME}
        <Typography><strong>Project ID: </strong>{PROJECT_ID}</Typography>
        <Typography><strong>Project Number: </strong>{PROJECT_NUMBER}</Typography>
        <Button color='purple' id={PROJECT_ID} onClick={handleSelectProject}>Select</Button>
      </div>
    </ThemeProvider>
  )
}

export default Project;