// Refactoring page2 only focused on GCloud - Cristina xx
// Meant to replace CloudForm

// Will render these components...
    // Projects
    // Clusters
    // Form
    // YamlGenerator

// Priorities...
    // [DONE] Get this page to render
    // [DONE] Build containers
    // Refactor project component to fill into container
    // Refactor clusters component to fill into container
    // on project select create wrap around container
    // Make header responsive

import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Project from '../components/Project';
import Form from '../components/Form';
import YamlGenerator from '../components/YamlGenerator';

const Page2 = () => {
  const [projectState, setProjectState] = useState({
    selectedProject: null,
    projects: [{id: 1}, {id: 2}, {id: 3}]
  });

  const [selectedCluster, setSelectedCluster] = useState(null);
  let sampleClusters = [1,2,3];

    // FETCH REQUEST TEMPLATE 
    const fetchRequest = async (endpoint, method, card) => {
      
      const defaultHeader = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
      };

      // If a method is is passed, it updates the default header
      let header = method ? { ...defaultHeader, method} : defaultHeader;

      try {
        const response = await fetch(endpoint, header);
        
        // Check for network or HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        };

        // Otherwise, log the result!
        const result = response.json();
        console.log("Successful fetch request:", result);

      } catch (error) {
        // Log the error so that devs can see it
        console.error("Error with fetch request:", error);
        // Throw the error so that the calling function can see it and deal with it accordingly
        throw error;
      }

    }

    // PROJECTS
    // 1. Get projects from GCloud
      // useEffect to get projects on initial component loading
    // 2. Get projects on load
        // Show loading spinner while waiting
        // Display error if failed
    // 3. Handle user selecting a project

    const handleSelectProject = (index) => {
      setProjectState({...projectState, selectedProject: projectState.projects[index]});
      getClusters();
      // NEXT STEPS:
        // Display a loading message to prevent the user from going crazy w clicks
        // Add throttle to minimize too many calls to GCloud
        // Call the function that loads clusters
    };
  
    const handleSelectProjectStyles = (index) => {
      return projectState.projects[index] === projectState.selectedProject ? 'project selected-project' : 'project'; 
    };

    // CLUSTERS
    // 1. [ASK TARIK] Get clusters from GCloud based on selected project
      // Show loading spinner while waiting
      // Display error if failed
    // 2. [DONE] Visually handle select cluster
    // 3. Call a function to get corresponding deployments

    const getClusters = (projectData) => {
      // Make req to backend for clusters based on selected project
      console.log('Loading clusters...');
    };
    
    const handleSelectCluster = (index) => {
      setSelectedCluster(index);
      getDeployments();
    };

    const handleSelectClusterStyles = (index) => {
      return index === selectedCluster ? 'cluster-wrapper selected-cluster' : 'cluster-wrapper'; 
    };

    // DEPLOYMENTS
    // 1. Get existing deployments from Google Cloud
    // 2. Show loading spinner when first rendered, when received show deployments?
    const getDeployments = (clusterData) => {
      // Make req to backend for deployments based on selected cluster
      console.log('Loading deployments...');
    }

    const loadForm = () => {
      console.log('The form will load now :)');
    };

    // FORM
    // Handle submit

  return (
    <>
      <div id='page2-header-container'>
        HEADER WILL GO HERE
        {/* make a container that has a fill background of an image */}
        {/* should say: Deploy with InKubator, start by selecting a project and cluster */}
      </div>

      <div id='google-projects-container' className='projects-container'> 
        {projectState.projects.map((elements, index) => (
          <div 
            key={index} 
            className={handleSelectProjectStyles(index)} 
            onClick={() => {handleSelectProject(index)}}
          > 
            <b className='project-header'>PROJECT</b>
            {/* <b>PROJECT</b> */}
            <Stack className='details' spacing={0.5}>
              <p><b>Name: </b>lustrious-vector-567</p>
              <p><b>ID: </b>sample-project-id</p>
              <p><b>Number: </b>09987652a89</p>
            </Stack>
          </div>
        ))}
      </div>

      <div id='google-clusters-container'> 
        {sampleClusters.map((elements, index) => (
          <div 
            className={handleSelectClusterStyles(index)}
            key={index}
          > 
            <div className='cluster'>
              <b >CLUSTER NAME</b>
              <Stack spacing={0.5} className='details'>
                <p><b>Location: </b>Midwest-central</p>
                <p><b>Status: </b>Running</p>
                <Button 
                  className='select-cluster-button'
                  onClick={() => {handleSelectCluster(index)}}
                >view</Button>
              </Stack>
            </div>
          </div>
        ))}
        
      </div>
      <div id='google-deployments-main-container'>
        <div id='google-loaded-deployments-container'>
        <Button>
          <Paper>DEPLOYMENT</Paper>
        </Button>
        <div className='deployment'>
          DEPLOYMENT
        </div>
        <div className='deployment'>
          DEPLOYMENT
        </div>
        <div className='deployment'>
          DEPLOYMENT
        </div>
        <div className='deployment'>
          DEPLOYMENT
        </div>
        </div>
        <div id='google-deployments-add-button-container'>
          <Tooltip title="New">
            <IconButton onClick={loadForm}>
              <AddCircleIcon fontSize='large'/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div id='google-form-container' className='projects-container'>
        <div>FORM HERE</div>
        <div>YAML HERE</div>
      </div>
    </>
  )
}

export default Page2;