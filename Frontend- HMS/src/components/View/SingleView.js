import * as React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import './Singleview.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { detail } from '../../utils/utils';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import {CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router';


export const MuiCard = () => {
  let navigate =useNavigate();
  const [myData, setMyData] = useState([]);
  const [open, setOpen] = useState(false);
 
  
  //Using prmises
  
  useEffect(() => {
    
    axios.get(detail)
      .then((response) =>{ setMyData(response.data)
       setOpen(true)     
      
       }).catch((error)=>{  
        alert('Unable to load data.')
        
        navigate('/')
       
       })
      }, [])

  return (
    <>

      { open? (myData.map((data) => (
      
        <Card className="cardStyle" 
          alignItems="center"
          justifyContent="center"         
          item xs={12} sm={6} md={4}
          key={myData.indexOf(data)}  
          sx={{ display: 'flex' ,flexDirection: 'column', minWidth:'250px', maxWidth:'250px',padding:'2%'}}
         >
          {/* <CardMedia  
           component="img" 
           height="140" 
           width='auto' 
           src={require("C:/Users/React/Node_ecom/upload/images/" +data.productImage)}
           alt="No image"
          /> */}

      <CardContent >
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div">
              {data.name}

            </Typography>

            <Typography 
              variant="body2" 
              color="text.secondary">
              {data.description}

            </Typography>
            
            <Typography 
              variant="h5" 
              color="text.secondary">              
              <CurrencyRupeeSharpIcon /> 
              {data.price}

            </Typography>
          </CardContent>

          <Button 
           variant="contained" 
           color="success" 
           className="buttonStyle" 
           style={{ width: '100%' }} >

            PURCHASE
          </Button>
          
        </Card>
   
      ))  ):(
        <CircularProgress color="inherit" />
      )
      
}



    </>

  );

}



