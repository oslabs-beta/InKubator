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

const Project = (props) => {
  console.log('FUNCTION', props.setSelectedProject)

  // console.log('projectData IN PROJECT/JSX', projectData.projectData)
  const {PROJECT_ID, NAME, PROJECT_NUMBER} = props.projectData;

  console.log('DECONSTRUCTED', PROJECT_ID, NAME, PROJECT_NUMBER)

  const handleSelectProject = async (e) => {
    console.log('e.target', e.target.id)
    props.setSelectedProject(e.target.id)
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