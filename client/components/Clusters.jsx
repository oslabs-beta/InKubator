import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Paper, Typography, Fab } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';


const Clusters = (props) => {
    const [showMore, setShowMore] = useState(false), fullResArr = [], partialResArr = [], [spin, setSpin] = useState(false)
    
    const handleShowMore = async (e) => {
        setShowMore(!showMore)
    }

    const handleSelectCluster = async (e) => {
        props.setClusterName(e.target.id)
    }

    const handleSpin = (e) => {
        setSpin(true)

        setTimeout(() => {
            setSpin(false)
        }, 1000);
    }

    let showMoreButton = <Button onClick={handleShowMore}> Show more </Button>
    let showLessButton = <Button onClick={handleShowMore}> Show less </Button>

    if (props.clusters) {
        props.clusters.forEach((prop, idx) => {
            const fullArr = [], partialArr = [];
            let button;

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
            fullResArr.push(<Paper style={{ margin: '10px' }} elevation={5} square={false}> <Grid item xs={'auto'}> {fullArr} {button} </Grid> </Paper>)
            partialResArr.push(<Paper style={{ margin: '10px' }} elevation={5} square={false}> <Grid item xs={'auto'}> {partialArr} {button} </Grid> </Paper>)
        })
    }

    return (
        <Grid 
            container
            // rowSpacing={10}
            // columnSpacing={10}
            justifyContent="center"
            alignItems="center">
            {props.clusters ? <Fab onClick={handleSpin} className={spin ? "spin" : ""} size="small"> <RefreshIcon/> </Fab> : <Button onClick={props.handleGetClusters}> Get Clusters </Button>}
            {showMore ? fullResArr : partialResArr}
            {props.clusters ? (showMore ?  showLessButton : showMoreButton) : null}
        </Grid>
    )
}

export default Clusters;