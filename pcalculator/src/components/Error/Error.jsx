/* eslint-disable react/prop-types */
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Error({ message }) {
  return (
    <Stack sx={{ width: '432px', margin: '0 auto', marginTop: '20px' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>
          <b>Error</b>
        </AlertTitle>
        <strong>{message}</strong>
      </Alert>
    </Stack>
  );
}
