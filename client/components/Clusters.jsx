import React, { useState, useEffect } from "react";
import { Box, Grid, Item, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';


const Clusters = (props) => {
    console.log('PROPS.CLUSTERS', props.clusters)
    console.log('Props.clusterName', props.clusterName)
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
                if (keys === 'NAME') {
                    button = <Button onClick={handleSelectCluster} key={prop[keys]} id={prop[keys]}> Select {prop[keys]} </Button>
                }
                tempArr.push(<Typography xs={10}> {keys} : {prop[keys]} </Typography>)
            }
            resArr.push(<Grid xs={'auto'}> {tempArr} {button} </Grid>)
            tempArr = [];
            console.log('resArr', resArr)
        })
    }

    return (
        <Grid container
        rowSpacing={0.2}
        columnSpacing={1}
        justifyContent="center"
        alignItems="center">
        {resArr}
      </Grid>
    )
}

export default Clusters;