import React from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';


const TestForm = () => {
  return (
    <div id="coming-soon">
      <Typography variant="h2" component="h2">
        Coming Soon
      </Typography>
      {/* <Typography variant='h6'>
        In the very near future, we'll be launching deployment on the cloud. Be the first to know when we officially launch.
      </Typography>
      <Box m={1}>
        <TextField
          label="TextField"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button>Submit</Button>
              </InputAdornment>
            ),
          }}
        />
      </Box> */}
    </div>
  )
}

export default TestForm;