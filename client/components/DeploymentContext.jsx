import React, { createContext, useContext, useEffect, useState } from 'react';

const DeploymentContext = createContext();

export function DeploymentProvider({ children }) {
    const [deploymentEnvironment, setDeploymentEnvironment] = useState(localStorage.getItem('deploymentEnvironment') || '');

    useEffect(() => {
        localStorage.setItem('deploymentEnvironment', deploymentEnvironment);
    }, [deploymentEnvironment])

  return (
    <DeploymentContext.Provider value={{ deploymentEnvironment, setDeploymentEnvironment }}>
      {children}
    </DeploymentContext.Provider>
  );
}

export function useDeployment() {
  return useContext(DeploymentContext);
}
