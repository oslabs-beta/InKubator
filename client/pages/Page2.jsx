// Refactoring page2 only focused on GCloud - Cristina xx
// Meant to replace CloudForm

// Will render these components...
    // Projects
    // Clusters
    // Form
    // YamlGenerator

// Priorities...
    // Get this page to render
    // Build containers
    // Refactor project component to fill into container
    // Refactor clusters component to fill into container
    // on project select create wrap around container
    // Make header responsive

import React, { useEffect } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import Project from '../components/Project';

const Page2 = () => {

    // THEME - this is for aesthetic purposes only

    // PROJECTS
    // 1. Get projects from GCloud
      // useEffect to get projects on initial component loading
    // 2. Get projects on load
        // Show loading spinner while waiting
        // Display error if failed
    // 3. Handle user selecting a project

    // CLUSTERS
    // 1. Get clusters from GCloud based on selected project
        // Show loading spinner while waiting
        // Display error if failed
    // 2. Handle select cluster
      // either have a handleclick function OR
        // could activate "halo" element
        // change cluster-wrapper with that id's background color?
      // change the appearance on active
        // give it a halo on active

    // FORM
    // Handle submit

  return (
    <>
      <div id='page2-header-container'>
        {/* make a container that has a fill background of an image */}
        {/* should say: Deploy with InKubator, start by selecting a project and cluster */}
      </div>
      <div id='google-projects-container' class='projects-container'> 
        {/* 1. all projects should populate on Load
        2. [DONE] on hover, they should change hues
        3. on click, they should change colors AND load clusters 
        4. each project will need an id */}
        <Grid className='project-card' direction='column'>
          <b>PROJECT</b>
          <Stack spacing={0.5}>
            <p>ID: sample-project-id</p>
            <p>Number: 09987652a89</p>
          </Stack>
        </Grid>
        <Grid className='project-card' direction='column'>
          <b>PROJECT</b>
          <Stack spacing={0.5}>
            <p>ID: sample-project-id</p>
            <p>Number: 09987652a89</p>
          </Stack>
        </Grid>
        <Grid className='project-card' direction='column'>
          <b>PROJECT</b>
          <Stack spacing={0.5}>
            <p>ID: sample-project-id</p>
            <p>Number: 09987652a89</p>
          </Stack>
        </Grid>
      </div>
      <div id='google-clusters-container' class='projects-container'> 
        {/* CLUSTERS HEHE 
        each cluster will need an id
        1. empty until a project is selected, on select, load All
        2. on click (of select button), query deployments */}
        <div className='cluster-wrapper'>
          <Grid className='cluster-card' direction='column'>
            <b>CLUSTER NAME</b>
            <Stack spacing={0.5}>
              <p>location: midwest</p>
              <p>Status: running</p>
              {/* Button needs a hover status? */}
              <Button className='select-cluster-button'>select</Button>
            </Stack>
          </Grid>
        </div>
      </div>
      <div id='google-deployments-container'>
        <div className='deployment-card'>
          DEPLOYMENT
        </div>
        <div className='deployment-card'>
          DEPLOYMENT
        </div>
        <div className='deployment-card'>
          DEPLOYMENT
        </div>
        <div className='deployment-card'>
          DEPLOYMENT
        </div>
        <div className='deployment-card'>
          DEPLOYMENT
        </div>
      </div>
      <div id='google-form-container' class='projects-container'>
        {/* Load form */}
        {/* Load yaml generator */}
        FORM HERE
        YAML HERE
      </div>
    </>
  )
}

export default Page2;