import React, { useState, useEffect } from "react";


const DeploymentPage = () => {

  const [deploymentStats, setDeploymentStats] = useState({});

  //Default deployment object
  let deplObjConstruct = {
    deployment: {
      name: 'name',
      pods: '0/0',
      image: 'image',
    },
    replicas: {
      name: 'name',
      pods: '0/0',
    },
    pods: [],
  };

    
  //Helper function that converts output string to object for DEPLOYMENT
  const helperDeploymentObject = (str) => {
    //Convert to array and remove spaces and empty strings
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    //Remove auto-generated fields
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);

    //Assuming this function receives only one deployment at a time
    deplObjConstruct.deployment.name = strToArr[0];
    deplObjConstruct.deployment.pods = strToArr[1];
    deplObjConstruct.deployment.image = strToArr[6];
    deplObjConstruct.replicas.pods = strToArr[1];
  };


  //Helper function that converts output string to object for PODS
  const helperPodsObject = (str) => {
    //Convert to array, remove spaces and empty strings, remove non-applicable fields
    let strToArr = str.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
    strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);
    
    //Get replica name
    let replicaName = strToArr[0].split('-').slice(0, 2).join('-');
    deplObjConstruct.replicas.name = replicaName;
    
    //Iterate to store pod information in pods array of objects
    while (strToArr.length > 1) {
      let pod = {
        name : strToArr[0],
        ready : strToArr[1],
        status : strToArr[2],
        restarts : strToArr[3],
      };
      deplObjConstruct.pods.push(pod);
      strToArr = strToArr.slice(strToArr.indexOf('\n')+ 1);
    };
  };


  const getStats = async () => {
    const fetchDeployment = await fetch('http://localhost:3001/status/getDeployment');
    const deploymentInfo = await fetchDeployment.json();
    helperDeploymentObject(deploymentInfo);

    const fetchPods = await fetch('http://localhost:3001/status/getPods');
    const podsInfo = await fetchPods.json();
    helperPodsObject(podsInfo);
    // console.log(deplObjConstruct);
  };

  useEffect(() => {
    getStats();
    setDeploymentStats(deplObjConstruct);
  }, [])

  console.log(deploymentStats);

  let deplArr = []
  for (let keyDepl in deplObjConstruct.deployment) {
    
  }

  return (
    <>
      <h1>Cluster Status</h1>

    </>
  )
}

export default DeploymentPage;