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

  // const {projectID, name, projectNumber} = projectInfo;

  const handleSelectProject = async (e) => {
    // console.log(e.target.id);
    // setProject state??
    console.log('hey this is the selected project')
  }

  return (
    <ThemeProvider theme={theme}>
      <div>hey</div>
    {/* <div className='project-cards'>
      Name
      <strong>Project ID:</strong> projectID
      <strong>Project Number:</strong> projectNumber
      <Button id='cristina' theme='purple' onClick={handleSelectProject}>
        Select
      </Button>
    </div> */}
    </ThemeProvider>
  )
}

export default Project;