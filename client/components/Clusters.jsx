import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Paper, Typography } from '@mui/material';


const Clusters = (props) => {
    const [showMore, setShowMore] = useState(false);

    const fullResArr = [];
    const partialResArr = [];
    let fullArr = [];
    let partialArr = [];

    const handleShowMore = async (e) => {
        setShowMore(!showMore)
    }

    const handleSelectCluster = async (e) => {
        props.setClusterName(e.target.id)
    }

    let showMoreButton = <Button onClick={handleShowMore}> Show more </Button>
    let showLessButton = <Button onClick={handleShowMore}> Show less </Button>

    if (props.clusters) {
        props.clusters.forEach((prop, idx) => {
            let button;
            console.log('PROP', prop, idx)
            for (let keys in prop) {
                if (keys === 'NAME') {
                    partialArr.push(<Typography xs={10} m={1}> {keys} : {prop[keys]} </Typography>)
                    button = <Button onClick={handleSelectCluster} key={prop[keys]} id={prop[keys]}> Select {prop[keys]} </Button>
                }
                if (keys === 'LOCATION') {
                    props.setLocation(prop[keys])
                    partialArr.push(<Typography xs={10} m={1}> {keys} : {prop[keys]} </Typography>)
                } 
                if (keys === 'STATUS') {
                    props.setStatus(prop[keys])
                    partialArr.push(<Typography xs={10} m={1}> {keys} : {prop[keys]} </Typography>)
                }
                fullArr.push(<Typography xs={10} m={1}> {keys} : {prop[keys]} </Typography>)
            }
            fullResArr.push(<Paper variant="outlined" style={{ margin: '10px' }} elevation={12} square={false}> <Grid xs={'auto'}> {fullArr} {button} </Grid> </Paper>)
            partialResArr.push(<Paper variant="outlined" style={{ margin: '10px' }} elevation={12} square={false}> <Grid xs={'auto'}> {partialArr} {button} </Grid> </Paper>)
            partialArr = [];
            fullArr = [];
            console.log('resArr', fullResArr)
        })
    }

    return (
        <Grid 
            container
            // rowSpacing={10}
            // columnSpacing={10}
            justifyContent="center"
            alignItems="center">
            {showMore ? fullResArr : partialResArr}
            {props.clusters ? (showMore ?  showLessButton : showMoreButton) : null}            
        </Grid>
    )
}

export default Clusters;