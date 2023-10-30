import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";


const YamlGenerator = () => {

  // set state for original yaml file
  // js to yaml

  const codeString = `apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: 
    labels:
      app: 
  spec:
    selector:
      matchLabels:
        app: 
    template:
      metadata:
        labels:
          app: 
      spec:
        containers:
          - ports:
              - containerPort: 3000
            name: 
            image: 
    replicas: 3
  `;

  return (
    <SyntaxHighlighter id='the-code-block' language="javascript" style={dracula}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default YamlGenerator;