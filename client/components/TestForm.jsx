import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Clusters from './Clusters'

const TestForm = () => {
  const [clusters, setClusters] = useState();
  const [clusterName, setClusterName] = useState(null);
  const [getCreds, setGetCreds] = useState();

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

    // console.log('YOU HAVE HIT THE FETCH REQUEST', header)
    const result = await fetch(`${endpoint}`, header)
        .then((data) => data.json())
        // .then((data) => console.log('DATA', data))
        .catch((err) => console.error(err))
    return result;
}

  const handleGetClusters = async (e) => {
    // console.log('GET CLUSTER WHOLE EVENT', e);
    // console.log('GET CLUSTER EVENT.TARGET', e.target);

    const allClusters = await (fetchRequest('http://localhost:3001/google/getClusters',{method: "POST"}));
    await setClusters(allClusters)
  }


  const handleGetCredentials = async (e) => {
    // console.log('clusterName', clusterName)
    const credsAreTied = await (fetchRequest('http://localhost:3001/google/getCredentials', {method: "POST", mode:"no-cors"}, {"clusterName": clusterName}))
    // await console.log('CREDS ARE TIED?', credsAreTied)
    await setGetCreds(credsAreTied)
    // await console.log(getCreds)
}

  return (
    <div id="coming-soon">
      <Typography> Current Cluster: {clusterName}</Typography>
      <Typography variant="h2" component="h2">
        Coming Soon
        <button onClick={handleGetClusters}> Get Clusters </button>
      </Typography>

      <Clusters
      clusters={clusters}
      clusterName={clusterName}
      setClusterName={setClusterName}>
      </Clusters>

      {clusterName ? (
                <Button onClick={handleGetCredentials}>
                YOU MADE IT 
                {/* {getCreds} */}
                </Button>
            ) : null}

      {/* <Typography variant='h6'>
        In the very near future, we'll be launching deployment on the cloud. Be the first to know when we officially launch.
      </Typography>
      <Box m={1}>
        <TextField
          label="TextField"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button>Submit</Button>
              </InputAdornment>
            ),
          }}
        />
      </Box> */}
    </div>
  )
}

export default TestForm;