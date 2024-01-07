// Refactoring page2 only focused on GCloud - Cristina xx

// Priorities...
// [WAITING] Make header responsive
// [WAITING] Get projects from GCloud
// [WAITING] Get clusters from GCloud
// [WAITING] Get deployments from GCloud
// [DONE] Get this page to render
// [DONE] Build containers
// [DONE] on project select create wrap around container
// [DONE] Refactor project component to fill into container
// [DONE] Refactor clusters component to fill into container

import React, { useState } from 'react';
import { Button, CircularProgress, IconButton, Stack, Box } from '@mui/material';
import { AddCircle, Refresh, InfoOutlined } from '@mui/icons-material';
import { Link, animateScroll as scroll} from 'react-scroll';
import Form2 from '../components/Form2.jsx';
import YamlGenerator from '../components/YamlGenerator.jsx';

const Page2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectState, setProjectState] = useState({
    selectedProject: null,
    projects: [{id: 1}, {id: 2}, {id: 3}]
  });
  const [clusters, setClusters] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [deployments, setDeployments] = useState(null);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  
  // Hard coded - for testing purposes only
  const sampleClusters = [1,2,3];
  const sampleDeployments = [1,2,3,4,5];

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
  // Get projects from GCloud
    // useEffect to get projects on initial component loading
    // Show loading spinner while waiting
    // Display error if failed

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
  // [ASK TARIK] Get clusters from GCloud based on selected project
  // Display error if failed

  const getClusters = (projectData) => {
    // Make req to backend for clusters based on selected project
    try {
      // Begin loading state
      setIsLoading(true);
      console.log('Loading clusters...');

      // Insert fetch request here!

      // Update cluster state with returned data
      setClusters(sampleClusters);
      console.log('Done loading clusters');

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      // Reset loading state 
      setIsLoading(false);
    }
  };
  
  const handleSelectCluster = (index) => {
    setSelectedCluster(index);
    getDeployments();
  };

  const handleSelectClusterStyles = (index) => {
    return index === selectedCluster ? 'cluster-wrapper selected-cluster' : 'cluster-wrapper'; 
  };

  // DEPLOYMENTS
  // Get existing deployments from Google Cloud
  // Refresh deployments
  const getDeployments = (clusterData) => {
    // Make req to backend for deployments based on selected cluster
    try {
      setIsLoading(true);
      console.log('Loading deployments...');
      // Do the fetch request
      // Update deployment state with returned data
      setDeployments('a');
      console.log('Done loading deployments.');
    } catch (error) {
      console.log(`Error: ${error}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDeployment = (index) => {
    setSelectedDeployment('Sample deployment');
    console.log('You selected a deployment');
  };

  const refreshDeployments = () => {
    console.log('Refreshing deployments!');
  };

  // FORM
  const loadForm = () => {
    console.log('The form will load now :)');
  };

  const [yamlPreview, setYamlPreview] = useState({
    portNumber: {value: ''},
    replicas: {value: ''},
    dockerImage: {value: ''},
  });

  return (
    <>
      <div id='page2-header-container'>
        HEADER WILL GO HERE
        {/* make a container that has a fill background of an image */}
        {/* should say: Deploy with InKubator, start by selecting a project and cluster */}
      </div>

      <div id='google-projects-container' className='projects-container'> 
        {projectState.projects.map((_, index) => (
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
          </div>))}
      </div>

      <div id='google-clusters-container'> 
        {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
        {clusters === null ? false : sampleClusters.map((_, index) => (
          <div 
            className={handleSelectClusterStyles(index)}
            key={index}> 
            <div className='cluster'>
              <b >CLUSTER NAME</b>
              <Stack spacing={0.5} className='details'>
                <p><b>Location: </b>Midwest-central</p>
                <p><b>Status: </b>Running</p>
                <Button 
                  variant='contained'
                  className='select-cluster-button'
                  onClick={() => {handleSelectCluster(index)}}
                >view</Button>
              </Stack>
            </div>
          </div>))}
      </div>
      <div id='google-deployments-main-container'>
        <div id='google-loaded-deployments-container'>
          {deployments === null ? false : 
            sampleDeployments.map((_, index) => (
              <div 
                key={index} 
                className='deployment'
                onClick={() => {handleSelectDeployment(index)}}
              >
                DEPLOYMENT
                each one will have a link to the next section
              </div>))}
        </div>
        {deployments === null ? false : 
          <div id='google-deployments-button-container'>
            <Link 
              to='google-form-container'
              activeClass="active"
              spy={true}
              smooth={true}
              duration={900}
            >
              <IconButton onClick={loadForm}>
                <AddCircle fontSize='medium'/>
              </IconButton>
            </Link>
            <IconButton onClick={refreshDeployments}>
              <Refresh fontSize='medium'/>
            </IconButton>
            <IconButton onClick={loadForm}>
              <InfoOutlined fontSize='medium'/>
            </IconButton>
          </div>}
      </div>
      <div id='google-form-container'>
        <Form2 selectedCluster={selectedCluster}/>
      </div>
    </>
  )
}

export default Page2;