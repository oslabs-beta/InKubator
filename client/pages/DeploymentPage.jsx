import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const DeploymentPage = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/">Landing</Link>
        <Link href="/form">Form</Link>
        <Typography> Deployment Page </Typography>
      </Breadcrumbs>
      <h1>List of Deployments</h1>
    </>
  )
}

export default DeploymentPage;