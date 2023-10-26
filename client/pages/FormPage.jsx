import React, { useState } from "react";
import Form from '../components/Form';
import CloudForm from '../components/CloudForm';

const FormPage = ({ deploymentEnvironment }) => {
  return (
    <>
      {deploymentEnvironment === 'cloud' ? <CloudForm /> : <Form />}
    </>
  )
}

export default FormPage;