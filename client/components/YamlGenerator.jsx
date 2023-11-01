import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";


const YamlGenerator = ({ formValues, setFormValues, yamlPreview, setYamlPreview }) => {
  console.log('Values are ', formValues.deploymentName.value);




  const codeString = `
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: ${formValues.deploymentName.value}
    labels:
      app: ${formValues.labelNames.value}
  spec:
    selector:
      matchLabels:
        app: ${formValues.labelNames.value}
    template:
      metadata:
        labels:
          app: ${formValues.labelNames.value}
      spec:
        containers:
          - ports:
              - containerPort: ${yamlPreview.portNumber.value}
            name: 
            image: ${yamlPreview.dockerImage.value}
    replicas: ${yamlPreview.replicas.value}
  `;

  return (
    <SyntaxHighlighter id='the-code-block' language="yaml" style={anOldHope}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default YamlGenerator;