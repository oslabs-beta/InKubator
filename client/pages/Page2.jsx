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
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Project from '../components/Project';

const Page2 = () => {
  const [projectState, setProjectState] = useState({
    selectedProject: null,
    projects: [{id: 1}, {id: 2}, {id: 3}]
  });

  const [selectedCluster, setSelectedCluster] = useState(null);

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
      // NEXT STEPS:
        // Display a loading message to prevent the user from going crazy w clicks
        // Add throttle to minimize too many calls to GCloud
        // Call the function that loads clusters
    };
  
    const handleSelectProjectStyles = (index) => {
      return projectState.projects[index] === projectState.selectedProject ? 'project selected' : 'project'; 
    };

    // CLUSTERS
    // 1. [ASK TARIK] Get clusters from GCloud based on selected project
      // Show loading spinner while waiting
      // Display error if failed
    // 2. [DONE] Visually handle select cluster
    // 3. Call a function to get corresponding deployments

    const sampleClusters = [{}, {}];
    
    const handleSelectCluster = (index) => {
      setSelectedCluster(index);
    };

    const handleSelectClusterStyles = (index) => {
      return index === selectedCluster ? 'cluster-wrapper selected' : 'cluster-wrapper'; 
    };

    // DEPLOYMENTS
    // 1. Get existing deployments from Google Cloud
    // 2. Show loading spinner when first rendered, when received show deployments?
    // 

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
        {/* 1. [ASK TARIK] all projects should populate on Load
        2. [DONE] on hover, they should change hues
        3. [DONE] on click, they should change colors 
            AND load clusters 

        {/* ITERATE OVER THE ARRAY THAT COMES BACK FROM GCLOUD */}
        {/* Might need to do some prop drilling */}
        {projectState.projects.map((elements, index) => (
          <div 
            key={index} 
            className={handleSelectProjectStyles(index)} 
            onClick={() => {handleSelectProject(index)}}
          >
            <b>PROJECT</b>
            <Stack spacing={0.5}>
              <p>ID: sample-project-id</p>
              <p>Number: 09987652a89</p>
            </Stack>
          </div>
        ))}
      </div>

      <div id='google-clusters-container'> 
        {/* CLUSTERS HEHE 
        each one will have a button
        on select, that click will trigger the wrapper style to update
        each cluster will need an id
        1. empty until a project is selected, on select, load All
        2. on click (of select button), query deployments */}
        {sampleClusters.map((elements, index) => (
          <div 
            className={handleSelectClusterStyles(index)}
            key={index}
          > 
            <div className='cluster'>
              <b>CLUSTER NAME</b>
              <Stack spacing={0.5}>
                <p>location: midwest</p>
                <p>Status: running</p>
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
          <IconButton><AddCircleIcon fontSize='large'/></IconButton>
        </div>
      </div>
      <div id='google-form-container' className='projects-container'>
        {/* Load form */}
        {/* Load yaml generator */}
        <div>FORM HERE</div>
        <div>YAML HERE</div>
      </div>
    </>
  )
}

export default Page2;