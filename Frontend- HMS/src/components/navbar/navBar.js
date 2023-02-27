import * as React from "react";
import { AppBar, Box,Button} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar(){
    return(
    
  <AppBar position="static" sx={{mb:5}}>
  <Toolbar  style={{height:'100px'}} >
   
   <div >
    <Typography variant="h6" 
     color="inherit" 
     component="div"   
     >
       <b>  Kis Kiosk</b>
    </Typography>
    
    </div>
  </Toolbar>
</AppBar>

    );
}
