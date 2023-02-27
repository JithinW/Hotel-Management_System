
import * as React from 'react';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import './body.css'

function BoxView() {
    let navigate = useNavigate();
    return (

        <Grid
            sx={{ mt: 20, mb: 40, ml: 15, mr: 15 }}
            display="flex" justifyContent="center" alignItems="center"
            fontSize={20}
        >
            <div className='buttonStyle'>
                <Button onClick={() =>
                    navigate("/ViewProducts")} sx={{ fontSize: '18px',pr:'5%'}}
                    
                    >View Products
                </Button>
                <Button onClick={() =>
                    navigate("/AddProduct")} sx={{ fontSize: '18px'}}>Add Product
                </Button>
            </div>
</Grid>
     

    );

}
export default BoxView;