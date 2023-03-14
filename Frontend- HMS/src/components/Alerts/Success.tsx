import { Alert, AlertTitle, Stack } from '@mui/material'
import React from 'react'

 function Success() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong></strong>
      </Alert>
    </Stack>
  )
}

export default Success