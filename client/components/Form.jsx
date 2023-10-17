import { useState } from "react"

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
            <br><label for="deploymentName">Deployment name:</label>
            <input type="text" id="deploymentName" onChange={(e) => handleInputChange(e, setDeploymentName)} /><br>
            <p className="info">Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.</p>
            </br></br>
 
            <br><label for="numReplicas">Number of replicas:</label>
            <input type="number" id="numReplicas" onChange={(e) => handleInputChange(e, setNumReplicas)} /><br>
            <p className="info">The desired number of Pod resources is set in the Replicas field.</p>
            </br></br>

            <br><label for="clusterLabel">Cluster label:</label>
            <input type="text" id="clusterLabel" onChange={(e) => handleInputChange(e, setClusterLabel)} /><br>
            <p className="info">Labels are custom key/value pairs that are assigned to Kubernetes resources.</p>
            </br></br>

            <br><label for="dockerImage">Docker Image:</label>
            <input type="text" id="dockerImage" onChange={(e) => handleInputChange(e, setDockerImage)} /><br>
            <p>Optional: reference a container image from a Docker feed. </p>
            </br></br>

            <br><label for="containerPort">Port Number:</label>
            <input type="number" id="containerPort" onChange={(e) => handleInputChange(e, setContainerPort)} /><br>
            <p>The Port number is required and must be a number between 1 and 65535.</p>
            </br></br>

            <button id="btnMinikube">Deploy</button>

        </form>
    )
}

export default Form;