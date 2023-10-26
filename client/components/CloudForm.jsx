import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import Clusters from './Clusters'
import Form from './Form';
import { get } from "jquery";

const CloudForm = () => {
  const [clusters, setClusters] = useState();
  const [clusterName, setClusterName] = useState(null);
  const [clusterLocation, setClusterLocation] = useState(null);
  const [getCreds, setGetCreds] = useState(false);

  const fetchRequest = async (endpoint, method, card) => {
    // If no "method" is passed, it uses this default header
    let defaultHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
        };
        // if a method is is passed, it updates the default header
    let header = Object.assign({}, defaultHeader, method);

    const result = await fetch(`${endpoint}`, header)
        .then((data) => data.json())
        // .then((data) => console.log('DATA', data))
        .catch((err) => console.error(err))
    return result;
}

  const handleGetClusters = async (e) => {
    const allClusters = await (fetchRequest('http://localhost:3001/google/getClusters',{method: "POST"}));
    await setClusters(allClusters)
  }

  const handleGetCredentials = async (e) => {
    const credsAreTied = await (fetchRequest('http://localhost:3001/google/getCredentials', {method: "POST"}, {"clusterName": clusterName}))
    await setGetCreds(credsAreTied)
  }

  return (
    <>
    <div id="cluster">
      <Typography variant="h2" component="h2"> 
      Current Cluster:{clusterName}
        <button onClick={handleGetClusters}> Get Clusters </button>
      </Typography>

      <Clusters
      clusters={clusters}
      clusterName={clusterName}
      setClusterName={setClusterName}>
      </Clusters>

      {clusterName ? (
        <Button onClick={handleGetCredentials}>
        Proceed with {clusterName}
        </Button>
      ) : null}
      
      {getCreds ? (<Form/>) : null}
      
    </div>
    </>
  )
}

export default CloudForm;