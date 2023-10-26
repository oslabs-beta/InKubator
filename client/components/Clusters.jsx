import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Paper, Typography } from '@mui/material';


const Clusters = (props) => {
    const resArr = [];
    let tempArr = [];

    const handleSelectCluster = async (e) => {
        props.setClusterName(e.target.id)
    }

    if (props.clusters) {
        props.clusters.forEach((prop, idx) => {
            let button;
            console.log('PROP', prop, idx)
            for (let keys in prop) {
                if (keys === 'LOCATION') props.setLocation(prop[keys])
                if (keys === 'STATUS') props.setStatus(prop[keys])
                if (keys === 'NAME') {
                    button = <Button onClick={handleSelectCluster} key={prop[keys]} id={prop[keys]}> Select {prop[keys]} </Button>
                }
                tempArr.push(<Typography xs={10} m={1}> {keys} : {prop[keys]} </Typography>)
            }
            resArr.push(<Paper variant="outlined" style={{ margin: '10px' }} elevation={12} square={false}> <Grid xs={'auto'}> {tempArr} {button} </Grid> </Paper>)
            tempArr = [];
            console.log('resArr', resArr)
        })
    }

    return (
        <Grid 
        container
        // rowSpacing={10}
        // columnSpacing={10}
        justifyContent="center"
        alignItems="center">
        {resArr}
      </Grid>
    )
}

export default Clusters;