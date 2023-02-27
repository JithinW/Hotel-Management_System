import React from 'react';
import { MuiCard } from "./SingleView";
import Navbar from "../navbar/navBar";
import { Grid, Box } from '@mui/material';


function ViewProducts() {

  return (
    <div style={{ backgroundColor: 'white' }}
    >

      <Navbar />
      <Box

        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginLeft="7%"
        marginRight="7%"
        style={{ minHeight: "150vh" }}
        
      >
        
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} 
              style={{justifyContent:'center'}}>

          <MuiCard />
        
        </Grid>
        
      </Box>
      
    </div>
    
  );
}
export default ViewProducts;