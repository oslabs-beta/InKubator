import React, { useState } from "react";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import Form from '../components/Form';
import CloudForm from '../components/CloudForm';
import YamlGenerator from "../components/YamlGenerator";

const FormPage = ({ deploymentEnvironment }) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/">Landing</Link>
        <Typography>Form</Typography>
      </Breadcrumbs>
      <Grid container spacing={2} direction='row'>
        <Grid item md={8}>
          {deploymentEnvironment === 'cloud' ? <CloudForm /> : <Form />}
        </Grid>
        <Grid item md={4}>
          <YamlGenerator/>
        </Grid>
      </Grid>
    </>
  );
};

export default FormPage;