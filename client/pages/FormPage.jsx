import React from "react";
import { useDeployment } from '../components/DeploymentContext.jsx'
import { Breadcrumbs, Stack, Link, Typography } from "@mui/material";
import Form from '../components/Form';
import CloudForm from '../components/CloudForm';
import YamlGenerator from "../components/YamlGenerator";

const FormPage = () => {
  const { deploymentEnvironment } = useDeployment();

  return (
    <>
    <Stack>
      <Breadcrumbs aria-label="breadcrumb" style={{paddingBottom:'12px'}}>
        <Link underline="hover" href="/">Landing</Link>
        <Typography>Form</Typography>
      </Breadcrumbs>
      {deploymentEnvironment === 'minikube' ? <Form/> : <CloudForm/>}
    </Stack>
    </>
  );
};

export default FormPage;