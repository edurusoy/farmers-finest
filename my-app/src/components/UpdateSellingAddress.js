import React, {useState}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useHistory} from "react-router-dom";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import app from "../fbase";
import ReceiptIcon  from "@material-ui/icons/Receipt"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    cancelButton:{
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.secondary.main
    },
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
    linkStyle:{
      textDecoration: 'none',
      color: '#FFF'
    },
    linkStylewotcolor:{
      textDecoration: 'none',
      color: ' #625750'
    }
  }));


  export default function UpdateDeliveryAddress() {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const history = useHistory();
    const {id} = useParams();
    const [oldaddress, setOldaddress] = useState([]); 

    const addressSchema = Yup.object().shape({
        city: Yup.string()
          .min(3, "Too short for a city name"),
        address: Yup.string()
            .min(10, "Too short for a address")
      });
    

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};

if(oldaddress.length < 1){
    postSellingAddressId();
}

async function postSellingAddressId() { 
    const obj={
        id: id
    };
    const response = await fetch("/SetSellingAddressId", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(obj),
    });
    console.log(response.status);
    getSellingAddresses();
    return response;
  }

  async function getSellingAddresses() {
    const response = await fetch("/GetSellingAddresswithId");
    const data = await response.json();
    console.log(data);
    setOldaddress(data);
  }


  async function handleSubmit(values) {
    try{
        console.log(values);
        const response = await postDataSellingAddress(values);
        console.log(response.status);
        if (response.ok){
            history.push("/AddressesofFarmer");
        }
    } catch {
        console.log("catch");
      }
  }

  async function postDataSellingAddress(address) {   
    const response = await fetch("/UpdateSellingAddress", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(address),
    });
    console.log(response.status);
    return response;
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
    <React.Fragment>
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
          <React.Fragment >
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
    </div>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocationOnIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Selling Address
        </Typography>
        <br/>
        <Typography component="h4" variant="h9">
          Please provide just the informations that you want to update
        </Typography>
        <br/>
        {oldaddress.map((c) => {
        return(
        <Formik 
        initialValues={{
              city: c.city,
              address: c.address,
          }} 
          onSubmit={handleSubmit}
          validationSchema={addressSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            name="address"
            label="Address"
            id="address"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
          </Form>
          )}
        </Formik>
         )
        })}
      </div>
    </Container>
    </React.Fragment>
    )
}
