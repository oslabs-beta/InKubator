import React, { useState, useEffect } from "react";
import { Box, Chip, Grid, Button, Stack, Fab, Typography, CircularProgress, Tooltip } from '@mui/material';
import { Link, animateScroll as scroll } from 'react-scroll';
import clustersHeader from '../assets/clusters-header.png'
import Clusters from './Clusters'
import Form from './Form';
import { InfoOutlined } from "@mui/icons-material";

const CloudForm = () => {
  const [clusters, setClusters] = useState();
  const [clusterName, setClusterName] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const [getCreds, setGetCreds] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // ?
  const handleGetClusters = async (e) => {
    const allClusters = await (fetchRequest('http://localhost:3001/google/getClusters',{method: "POST"}));
    await setClusters(allClusters)
  }

  // ??
  const handleGetCredentials = async (e) => {
    const credsAreTied = await (fetchRequest('http://localhost:3001/google/getCredentials', {method: "POST"}, {"clusterName": clusterName, "location": location}))
    await setGetCreds(credsAreTied)
  }

  const statusChip = (status) => {
    // If status = running, make chip green
    // Anything else, make chip red
    const statusText = status.toLowerCase();
    if (statusText === 'running') {
      return <Chip label={statusText} variant='outlined' color='success' />
    } else {
      return <Chip label={statusText} variant='outlined' color='error' />
    }
  }
  // ??
  useEffect(() => {
    handleGetClusters()
  }, [])

  // Set loading to false once the content renders
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, clusters)



  return (
    <>
    <Grid container id='clusters-main-container' justifyContent="center" alignItems="center" >
      <Grid item id='clusters-header' xs={12}>
        <img src={clustersHeader} id='clusters-header-img' />
      </Grid>
      <Grid id='clusters-container-B' item xs={12}>
        {isLoading ? // if loading, render loading circle
          <Grid className='clusters-container-A'>
            <CircularProgress/> 
          </Grid>
          : // or render clusters
          <Clusters
            clusters={clusters}
            clusterName={clusterName}
            setClusterName={setClusterName}
            setLocation={setLocation}
            setStatus={setStatus}
            handleGetClusters={handleGetClusters}
          />}
      </Grid>
      <Grid item xs={6} id='selected-cluster-container'>
        {clusterName ? (
          <Stack justifyContent="center" alignItems="left">
            <Typography variant="h6" component="h6"> 
              Selected: {clusterName}
            </Typography>
            

            <Typography variant='h6' component='h6'>
              Status: {statusChip(status)}
              <Tooltip title='Status must be running to proceed' placement='right'>
                <InfoOutlined/>
              </Tooltip>
            </Typography>

          </Stack>
        ) : null}
        <Fab 
          onClick={handleGetCredentials} color="primary" variant="extended"> 
            Proceed 
          <Link
            to="form">
          </Link>
        </Fab> 
      </Grid>
    </Grid>
    <Box display="flex" justifyContent="center" alignItems="center">
      {getCreds ? (<Form/>) : null}
    </Box>
    </>
  )
}

export default CloudForm;