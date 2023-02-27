import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Typography,
  Button,
  Grid,
  Paper, Backdrop, CircularProgress, Snackbar, Alert
} from "@mui/material";
import { addImg, addUrl, img } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';



const AddProduct = () => {
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);


  const [productImage, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDis] = useState('')
  const [price, setPrice] = useState('')



  function handleSubmit() {

    setOpen(!open);

    const FormPostdata = new FormData();
    FormPostdata.append("name", name)
    FormPostdata.append('price', price)
    FormPostdata.append('description', description)
    FormPostdata.append('productImage', productImage)


    axios(addUrl, {
      method: 'POST',
      data: FormPostdata 

    }).then((res) => {

      // image.files[0].name = res.data._id;
//       const FormPostdata = new FormData();
//       FormPostdata.append('img', image)

//       axios(addImg, {
//         method: 'POST',
//         data: image 
//       }).then((res) => {
// alert(res)
// console.log(res)
//       }).catch((error) => {
//         alert(error)
//       })
      alert('Product Added Succesfully')
      navigate('../ViewProducts');

    }).catch((error) => {
      
      alert(error)
      navigate('/');
    });
  }



  return (
    <>

      <Paper
        padding="20"
        height="fit-content"
        required
        width="280"
        elevation={15}
        sx={{ ml: '30%', mr: '30%', mb: '10%', mt: '5%' }}
        style={{ borderRadius: '15px', bgcolor: 'black' }}
      >

        <Typography
          paddingTop={"7%"}
          align='center' gutterBottom
          variant="h5" >ADD PRODUCT
        </Typography>

        <Grid
          sx={{ pt: '5%', pb: '20%', pr: '20%', pl: '20%' }}>
          <TextField
            sx={{ width: '100%' }}
            type="text"
            variant='filled'
            required
            label="Product Name"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}

          />

          <TextField
            sx={{ width: '100%', mt: '8%' }}
            type="text"
            label="Description"
            variant="filled"
            required
            name='description'
            value={description}
            onChange={(e) => setDis(e.target.value)}

          />

          <TextField
            sx={{ width: '100%', mt: '8%', mb: '6%' }}
            type="number"
            label="Price"
            variant="filled"
            required
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}

          />
          <input accept="image/*" type="file"
          
            onChange={(e) => setImage(e.target.files[0])} />

          <Button

            type="submit"
            variant="contained"
            color="secondary"
            sx={{ width: '100%', mt: '8%' }}
            onClick={handleSubmit} >Add
          </Button>

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>

        </Grid>
      </Paper>

    </>
  )
};


export default AddProduct;