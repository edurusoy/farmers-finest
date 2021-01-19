
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {useParams} from 'react-router-dom';
import app from "../fbase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  styling:{
    background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)'
},
appBarDialog: {
    position: 'relative',
    background: 'linear-gradient(45deg, #6b5b95, #b8a9c9)'
  },
titleDialog: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  uploadRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  cardRoot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  gridStyling:{
    marginTop: '60px'
},
linkStyle:{
  textDecoration: 'none',
  color: '#FFF'
},
linkStylewotcolor:{
  textDecoration: 'none',
  color: ' #625750'
}
}));

export default function UpdateProduct() {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const {id} = useParams();
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};


  const productSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    amount: Yup.number().required("Product amount is required"),
    unitPrice: Yup.number().required("Unit price is required"),
    category: Yup.string().required("Product category is required"),
    details: Yup.string(),
  });

if(product.length < 1){
    postProductId();
}


async function postProductId() { 
    const obj={
        id: id
    };
    const response = await fetch("/SetProductId", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(obj),
    });
    console.log(response.status);
    getProductwithId();
    return response;
  }

  async function getProductwithId() {
    const response = await fetch("/GetProductwithId");
    const data = await response.json();
    console.log(data);
    setProduct(data);
  }

  async function postDataProduct(product) { 
    const response = await fetch("/UpdateProduct", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(product),
    });
    console.log(response.status);
    return response;
  }


  async function handleSubmit(values) {
    try{
        console.log(values);
        const response = await postDataProduct(values);
        console.log(response.status);
        if (response.ok){
            history.push("/Farmer/Store");
        }
    } catch {
        console.log("catch");
      }
  }

  async function logoutFarmer() {   
    const response = await fetch("/LogoutFarmer", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(response.status);
    return response;
  }
  
  const logoutHandler = () =>{
     app.auth().signOut()
     logoutFarmer()
  }

    return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.styling}>
        <Toolbar>
        <Link to={"/Farmer"} className={classes.linkStyle}>
          <Typography variant="h6"  className={classes.title}>
            Farmer`s Finest
          </Typography>
          </Link>
          <Grid container spacing={3} justify = 'flex-end'> 
          <Grid item>
          <Button variant ="outlined" color = "inherit" startIcon={<AccountBoxIcon/>} onClick={toggleDrawer(true)}> Account</Button>
          </Grid>
          </Grid>
        </Toolbar>
        <div>
          <React.Fragment>
          <Drawer open={state} onClose={toggleDrawer(false)} >
          <div
              className={clsx(classes.list, classes.fullList)}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
              <Link to={"/FarmerProfile"} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<PersonOutlineIcon/>} </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  </Link>
                  <Link to={"/EditFarmerProfile"} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<EditIcon/>} </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                  </Link>
                  <Link to={"/OrdersofFarmer"} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<ReceiptIcon/>} </ListItemIcon>
                    <ListItemText primary="Order Info" />
                  </ListItem>
                  </Link>
                  <Link to={"/AddressesofFarmer"} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<LocationOnIcon/>} </ListItemIcon>
                    <ListItemText primary="Address" />
                  </ListItem>
                  </Link>
                  <ListItem button >
                    <ListItemIcon> {<ExitToAppIcon/>} </ListItemIcon>
                    <ListItemText primary="Logout" onClick={logoutHandler}/>
                  </ListItem>
              </List>   
            </div>
          </Drawer>
        </React.Fragment>
        </div>
      </AppBar>
        <div>
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Product
        </Typography>
        <br/>
        <Typography component="h4" variant="h9">
          Please provide just the informations that you want to update
        </Typography>
        {product.map((c) => {
        return(
        <Formik 
        initialValues={{
              productName: c.name,
              amount: c.amount,
              unitPrice: c.unitprice,
              category: c.category,
              details: c.details
          }} 
          onSubmit={handleSubmit}
          validationSchema={productSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
            <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount of Product"
            name="amount"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="unitPrice"
            label="Price per unit"
            name="unitPrice"
            autoComplete="off"
            autoFocus
          />
          <br/>
          <InputLabel>Category</InputLabel>
          <Field
              required
              fullWidth
              name="category"
              label="Category"
              component={Select}
            >
              <MenuItem value={'vegetable'}>Vegetable</MenuItem>
              <MenuItem value={'fruit'}>Fruit</MenuItem>
              <MenuItem value={'diary'}>Diary</MenuItem>
            </Field>
            <br/>
            <br/>
            <Field
            component={TextField}
            multiline
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Details"
            id="details"
            label="Details"
            name="details"
            autoComplete="off"
            autoFocus
          />
            <br/>
            <br/>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid}
          >Save</Button>
          </Form>
          )}
        </Formik>
        )
    })}
        </div>
        </Container>
        </div>
        </div>
    )
}
