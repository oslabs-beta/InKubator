import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Paper, Typography, Fab, Stack, Divider, Checkbox, FormControlLabel } from '@mui/material';
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
        if (keys === 'NAME') {
          partialArr.push(
            <Typography xs={10} m={1}> 
              {keys} : {cluster[keys]}
            </Typography>
          )
          button = 
          <Fab color="primary" variant="extended"
          onClick={handleSelectCluster}
          key={cluster[keys]} id={cluster[keys]}>
              Select 
          </Fab>
        }
        if (keys === 'LOCATION') {
            props.setLocation(cluster[keys])
            partialArr.push(
                <Typography xs={10} m={1}> 
                    {keys} : {cluster[keys]}
                </Typography>
            )
        } 
        if (keys === 'STATUS') {
            props.setStatus(cluster[keys])
            partialArr.push(
                <Typography xs={10} m={1}>
                    {keys} : {cluster[keys]}
                </Typography>
            )
        }
        fullArr.push(
            <Typography xs={10} m={1}>
                {keys} : {cluster[keys]}
            </Typography>
        )
      }
      fullResArr.push(
        <Paper variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
          <Stack justifyContent="center" alignItems="center">
            {fullArr} 
            {button}
          </Stack>
        </Paper>
      )
      partialResArr.push(
        <Paper variant="outlined" style={{ margin: '10px' }} elevation={5} square={false}>
          <Stack justifyContent="center" alignItems="center">
            {partialArr}
            {button}
          </Stack>
        </Paper>
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