import React, { useState, useEffect } from "react";
import { Box, Chip, Grid, Button, Paper, Typography, Fab, Stack, Divider, Checkbox, FormControlLabel } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Clusters = (props) => {
  // All declared states and variables
  const [showMore, setShowMore] = useState(false), [spin, setSpin] = useState(false), fullResArr = [], partialResArr = [];

  // OnClick event handlers
  const handleShowMore = async (e) => setShowMore(!showMore);
  const handleSelectCluster = async (e) => props.setClusterName(e.target.id);
  const handleSpin = (e) => {
      setSpin(true);

      setTimeout(() => {setSpin(false)}, 1000);
  };

  // Buttons
  const showMoreButton = <Button variant='contained' size='large' onClick={handleShowMore}> More info </Button>;
  const showLessButton = <Button variant='contained' size='large' onClick={handleShowMore}> Less info </Button>;
  const refreshButton = <Fab color="primary" onClick={handleSpin} className={spin ? "spin" : ""}> <RefreshIcon/> </Fab>;

  // If clusters are passed down via props, iterate over clusters, create a result array for all info, and another for partial info
  if (props.clusters) {
    props.clusters.forEach((cluster, idx) => {
      const fullArr = [], partialArr = [];
      let button;

      for (let keys in cluster) {
        
        // Format the cluster name, this is the header
        let formattedClusterName =  <div className='cluster-labels'>
                                      {cluster[keys]}
                                    </div>

        // Format the status, this is important info for the user
        let formattedStatus = <Chip label={cluster[keys]}/>

        if (keys === 'NAME') {
          partialArr.push(<div className='cluster-labels-container'>{formattedClusterName}</div>)
          fullArr.push(<div className='cluster-labels-container'>{formattedClusterName}</div>)
          button =  <Fab 
                      color="#8870E0" 
                      variant="extended"
                      onClick={handleSelectCluster}
                      key={cluster[keys]} 
                      id={cluster[keys]}
                    >
                      Select 
                    </Fab>
        }
        else if (keys === 'LOCATION') {
            props.setLocation(cluster[keys])
            partialArr.push(
              <Typography xs={10} m={1}> 
                <strong>{keys}: </strong>{cluster[keys]}
              </Typography>
            )
            fullArr.push(
              <Typography xs={10} m={1}> 
                <strong>{keys}: </strong>{cluster[keys]}
              </Typography>
            )
        } 
        else if (keys === 'STATUS') {
            props.setStatus(cluster[keys])
            partialArr.push(
              <Typography xs={10} m={1}>
                <strong>{keys}: </strong>{formattedStatus}
              </Typography>
            )
            fullArr.push(
              <Typography xs={10} m={1}>
                <strong>{keys}: </strong>{formattedStatus}
              </Typography>
          )
        } else {
          fullArr.push(
              <Typography xs={10} m={1}>
                <strong>{keys}: </strong>{cluster[keys]}
              </Typography>
          )
        }
      }
      fullResArr.push(
        <div className='cluster-paper'>
          <Stack justifyContent="left" alignItems="left">
            {fullArr} 
            {button}
          </Stack>
        </div>
      )
      partialResArr.push(
        <div className='cluster-paper'>
            {partialArr}
            {button}
        </div>
      )
    })
  }

  return (
    <Grid container className='clusters-container-A' justifyContent="center" alignItems="center">
      
      <Grid item id='user-clusters' direction='row' justifyContent='left' xs={10}>
        {showMore ? fullResArr : partialResArr}
      </Grid>

      <Grid item id='cluster-main-buttons' xs={2}>
        <Stack spacing={2} divider={<Divider/>}>
         {props.clusters ? (showMore ?  showLessButton : showMoreButton) : null}
         {props.clusters ? refreshButton : null}
        </Stack>
      </Grid>
      
    </Grid>
  )
}

export default Clusters;