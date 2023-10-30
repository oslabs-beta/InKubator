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

      <Grid className="formPage" container spacing={2}>
        <Grid item md={8}>
          {deploymentEnvironment === 'cloud' ? <CloudForm /> : <Form />}
        </Grid>
        <Grid item md={4}>
          <YamlGenerator/>
        </Grid>
      </Grid>
    </Stack>
    </>
  );
};

export default FormPage;