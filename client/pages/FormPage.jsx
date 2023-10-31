import React, { useState } from "react";
import { Box, Breadcrumbs, Stack, Grid, Link, Typography } from "@mui/material";
import Form from '../components/Form';
import CloudForm from '../components/CloudForm';
import YamlGenerator from "../components/YamlGenerator";

const FormPage = ({ deploymentEnvironment }) => {
  return (
    <>
    <Stack>
      <Breadcrumbs aria-label="breadcrumb" style={{paddingBottom:'12px'}}>
        <Link underline="hover" href="/">Landing</Link>
        <Typography>Form</Typography>
      </Breadcrumbs>
        DEPLOYMENT ENVIRONMENT: {deploymentEnvironment}
        {deploymentEnvironment === 'minikube' ? <Form/> : <CloudForm/> }
    </Stack>
    </>
  );
};

export default FormPage;