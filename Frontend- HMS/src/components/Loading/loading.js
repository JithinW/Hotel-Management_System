
import React from "react";
import { Backdrop,CircularProgress } from "@mui/material";
import { useState } from 'react';

function Loading(){
    
    const [open, setOpen] =useState(false)

    return(
 <>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}>
    <CircularProgress color="inherit" />
  </Backdrop>
  </>
    );
    
}
export default Loading;