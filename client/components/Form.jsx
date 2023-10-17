import React, { useState } from "react"

const Form = () => {
    const [deploymentName, setDeploymentName] = useState('');
    const [numReplicas, setNumReplicas] = useState('');
    const [clusterLabel, setClusterLabel] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [containerPort, setContainerPort] = useState('');

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form id="minikube-form">

            <br />
            <label for="deploymentName">Deployment name:</label>
            <input type="text" id="deploymentName" onChange={(e) => handleInputChange(e, setDeploymentName)} />
            <p className="info">Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.</p>
 
            <label for="numReplicas">Number of replicas:</label>
            <input type="number" id="numReplicas" onChange={(e) => handleInputChange(e, setNumReplicas)} />
            <p className="info">The desired number of Pod resources is set in the Replicas field.</p>

            <label for="clusterLabel">Cluster label:</label>
            <input type="text" id="clusterLabel" onChange={(e) => handleInputChange(e, setClusterLabel)} />
            <p className="info">Labels are custom key/value pairs that are assigned to Kubernetes resources.</p>
            

            <label for="dockerImage">Docker Image:</label>
            <input type="text" id="dockerImage" onChange={(e) => handleInputChange(e, setDockerImage)} />
            <p>Optional: reference a container image from a Docker feed. </p>
            

            <label for="containerPort">Port Number:</label>
            <input type="number" id="containerPort" onChange={(e) => handleInputChange(e, setContainerPort)} />
            <p>The Port number is required and must be a number between 1 and 65535.</p>
    

            <button id="btnMinikube">Deploy</button>

        </form>
    )
}

export default Form;