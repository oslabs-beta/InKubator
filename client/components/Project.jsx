import React from 'react'
import { Button, Grid } from '@mui/material';
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

const Project = (projectInfo) => {

  const {projectID, name, projectNumber} = projectInfo;

  const handleSelectProject = async (e) => {
    console.log(e.target.id);
    // setProject state??
  }

  return (
    <ThemeProvider theme={theme}>
    <div className='project-cards'>
      Name{name}
      <strong>Project ID:</strong> projectID{projectID}
      <strong>Project Number:</strong> projectNumber{projectNumber}
      <Button id={projectID} theme='purple' onClick={handleSelectProject}>
        Select
      </Button>
    </div>
    </ThemeProvider>
  )
}

export default Project;