import React, { useState, useEffect } from "react";


const DeploymentPage = () => {

  const [deploymentStats, setDeploymentStats] = useState({});

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
    pods: [{
      name: 'name',
      ready: '0/0',
      status: 'status',
      restarts: '0'
    }],
  };

  const getDeploymentStats = async () => {
    const fetchDeployment = await fetch('http://localhost:3001/status/getDeployment');
    const deploymentInfo = await fetchDeployment.json();
    console.log(deploymentInfo);
    //Function that converts output string to object
    const outputToObj = (str) => {
      //Convert to array and remove spaces and empty strings
      let strToArr = deploymentInfo.split(/(\s+)/).filter((el) => !el.includes(' ') && el !== '');
      //Remove auto-generated fields
      strToArr = strToArr.slice(strToArr.indexOf('\n') + 1);
      console.log(strToArr);
      //Assuming this function receives only one deployment at a time
      deplObjConstruct.deployment.name = strToArr[0];
      deplObjConstruct.deployment.pods = strToArr[1];
      deplObjConstruct.deployment.image = strToArr[6];
      console.log(deplObjConstruct);
    };
    outputToObj(deploymentInfo);
  };

  useEffect(() => {
    getDeploymentStats();
  }, [])



  return (
    <>
      <h1>List of Deployments</h1>
    </>
  )
}

export default DeploymentPage;