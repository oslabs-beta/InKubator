import React, { useState, useEffect } from "react";
import { Box, Chip, Grid, Button, Stack, Fab, Typography, CircularProgress, Tooltip, Paper } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import { InfoOutlined } from "@mui/icons-material";
import clustersHeader from '../assets/clusters-header.png'
import Clusters from './Clusters'
import Form from './Form';
import Project from "./Project";

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

const CloudForm = () => {
  const [clusters, setClusters] = useState([]);
  const [clusterName, setClusterName] = useState('');
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const [getCreds, setGetCreds] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

  const fetchRequest = async (endpoint, method, card) => {
    // If no "method" is passed, it uses this default header
    let defaultHeader = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
      };
    // If a method is is passed, it updates the default header
    let header = Object.assign({}, defaultHeader, method);

    const result = await fetch(`${endpoint}`, header)
      .then((data) => data.json())
      // .then((data) => console.log('DATA', data))
      .catch((err) => console.error(err))
    return result;
  }

  // Get clusters from selected Google Cloud project
  const handleGetClusters = async (e) => {
    const allClusters = await (fetchRequest('/google/getClusters', {method: "POST"}));
    console.log(allClusters)
    await setClusters(allClusters)
    setIsLoading(prevState => !prevState) // toggle isLoading true/false
  }

  const handleGetCredentials = async (e) => {
    const credsAreTied = await (fetchRequest('google/getCredentials', {method: "POST"}, {"clusterName": clusterName, "location": location}))
    await setGetCreds(credsAreTied)
  }

  const handleSelectProject = async (projectID) => {
    async function selectProject() {
      const res = await fetch('/google/selectProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "projectID": projectID })
      })
      const data = await res.json()
      // console.log("RESPONSE BACK", data)
      // reset all things back to default when you choose a new project to work off of
      handleGetClusters() // call getClusters everytime AFTER you select a project
      setGetCreds(false)
      setClusterName('')
      setStatus(null)
    }
    selectProject()
  }

  // useEffect to get projects on initial component loading
  useEffect(() => {
    async function getProjects() {
      const res = await fetch('/google/getProjects')
      const data = await res.json()
      console.log("Projects", data)
      setProjects(data)
    }
    getProjects()
  }, [])
  
  // Displays the selected cluster's status
  const statusChip = (status) => {
    // If status = running, make chip green
    // Anything else, make chip red
    if (status === 'RUNNING') {
      return <Chip label={status} variant='outlined' color='success' />
    } else {
      return <Chip label={status} variant='outlined' color='error' />
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>

        <Grid container id='clusters-main-container' justifyContent="center" alignItems="center" >

          <Grid item id='clusters-header' xs={12}>
            <img src={clustersHeader} id='clusters-header-img' />
          </Grid>

          <Grid id='projects-main-container' justifyContent='left'>
            {projects.length > 0 ? projects.map((project) => {
              return <Project projectData={project} setSelectedProject={handleSelectProject}/>
            }): <><Grid className='clusters-container-A'>
            <CircularProgress/> 
          </Grid></>}
          </Grid>

          <Grid id='clusters-container-B' item xs={12} justifyContent='left'>
            
            {isLoading || !clusters.length ? // If loading, render loading circle
            <Grid className='clusters-container-A'>
              <CircularProgress/> 
            </Grid>
            : null
            }

            {clusters.length > 0 ? <Clusters
              clusters={clusters}
              clusterName={clusterName}
              setClusterName={setClusterName}
              setLocation={setLocation}
              setStatus={setStatus}
              handleGetClusters={handleGetClusters}
            /> : <></> }

          </Grid>

          <Grid container xs={5} id='selected-cluster-container' direction='row'>

            <Grid xs={8}>
              {clusterName ? (

                <Stack justifyContent="center" alignItems="left" spacing={2}>
                  <Typography variant="h6" component="h6">{clusterName}</Typography>
                  
                  <Typography variant='h6' component='h6'>
                    Status: {statusChip(status)}

                    <Tooltip title='Status must be running to proceed' placement='right'>
                      <InfoOutlined/>
                    </Tooltip>

                  </Typography>

                </Stack>

              ) : null}

            </Grid>

            <Grid id='setup-form-continue-btn-container' xs={4}>
              <Button onClick={handleGetCredentials} color="purple" variant="contained" size='large'> 
                  Continue 
                <Link to="form"></Link>
              </Button>
            </Grid>

          </Grid>

        </Grid>

        <Grid className='form-main-container' >
          {getCreds ? (<Form/>) : null}
        </Grid>

      </ThemeProvider>
    </>
  )
}

export default CloudForm;




// All the code that I deleted LOOOL:





// Tying kubectl commands to Gcloud
  // useEffect(() => {
  //   // handleGetProjects()
  //   // handleGetClusters()
  // }, [])
  
  // useEffect(() => {
  //   // console.log('projects are here baby', projects, 'SET PROJECTS LOADED', projectsLoaded)
  //   renderProjects()
  // }, [projectsLoaded])
  
  // Set loading to false once the content renders
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, clusters)

  // const renderedProjectsArray = [];
  
  // const renderProjects = () => {
  //   console.log('PROJECTS RENDERED')
  //   if (projects) {
  //     for (let i = 0; i < projects.length; i++) {
  //       const project = projects[i];
  //       console.log('project', project)
  //       // render a project component
  //     }
  //   }
  // }

  // Get projects from Google Cloud, the user will select one
  // const handleGetProjects = async (e) => {
  //   const allProjects = await (fetchRequest('/google/getProjects', {method: "POST"}))
  //   await setProjects(allProjects)
  // }