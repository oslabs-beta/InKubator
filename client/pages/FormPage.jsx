import React, { useState } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import Form from '../components/Form';
import CloudForm from '../components/CloudForm';

const FormPage = ({ deploymentEnvironment }) => {
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/">
        Landing
      </Link>
      <Typography> Form </Typography>
    </Breadcrumbs>
      {deploymentEnvironment === 'cloud' ? <CloudForm /> : <Form />}
    </>
  );
};

export default FormPage;