import React, {useState}  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import {Link, useHistory, Redirect} from 'react-router-dom';
import app from "../fbase";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


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
    accordionStyling:{
      marginTop: '60px'
  },
  table: {
    maxWidth: 250,
  },
  tableContainer: {
    background: 'linear-gradient(45deg, #6b5b95, #b8a9c9)',
    marginTop:'60px'
  },
  buttonGroupRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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


export default function EditCustomerProfilePage() {
    const [profile, setProfile] = useState([])
    const classes = useStyles();
    const [state, setState] = useState(false);
    const history = useHistory();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const signUpSchema = Yup.object().shape({
        name: Yup.string()
          .min(4, "Too short for a name")
          .required("Name is required"),
        email: Yup.string()
          .email("Please provide a valid email")
          .required("Email is required"),
        phonenumber: Yup.string()
          .matches(phoneRegExp, 'Phone number is not valid')
      });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
    };

    if(profile.length < 1){
        getCustomerProfile();
    }

    async function getCustomerProfile() {
        const response = await fetch("/GetCustomerProfile");
        const data = await response.json();
        console.log(data);
        setProfile(data);
      }

      async function postDataCustomerProfile(profile) {   
        const response = await fetch("/UpdateCustomerProfile", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(profile),
        });
        console.log(response.status);
        return response;
      }
    
      async function handleSubmit(values) {
        try{
            console.log(values);
            const response = await postDataCustomerProfile(values);
            console.log(response.status);
            if (response.ok){
                history.push("/CustomerProfile");
            }
        } catch {
            console.log("catch");
          }
      }
      
      async function deleteCustomerAccount() {
        const response = await fetch("/DeleteCustomerAccount");
        console.log(response.status);
        app.auth().signOut()
      }


      async function logoutCustomer() {   
        const response = await fetch("/LogoutCustomer", {
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
         logoutCustomer()
      }

      return (
          <React.Fragment>
        <div className={classes.root}>
        <AppBar position="static" className={classes.styling}>
          <Toolbar>
          <Link to={"/Customer"} className={classes.linkStyle}>
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
                <Link to={'/CustomerProfile'} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<PersonOutlineIcon/>} </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  </Link>
                  <Link to={'/EditCustomerProfile'} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<EditIcon/>} </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                  </Link>
                  <Link to={'/OrdersofCustomer'} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<ShoppingBasketIcon/>} </ListItemIcon>
                    <ListItemText primary="Orders" />
                  </ListItem>
                  </Link>
                  <Link to={'/CardsofCustomer'} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<CreditCardIcon/>} </ListItemIcon>
                    <ListItemText primary="Credit Cards" />
                  </ListItem>
                  </Link>
                  <Link to={'/AddressesofCustomer'} className={classes.linkStylewotcolor}>
                  <ListItem button >
                    <ListItemIcon> {<LocationOnIcon/>} </ListItemIcon>
                    <ListItemText primary="Addresses" />
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
          <div>
        {profile.map((c) => {
          return(
            <div>
    <Container component="main" maxWidth="xs" >
      <CssBaseline /> 
      <div className={classes.paper} >
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <br/>
        <Typography component="h4" variant="h9">
          Please provide just the informations that you want to update
        </Typography>
        <br/>
        <Formik
          initialValues={{
            name: c.name,
            email: c.email,
            phonenumber: c.phonenumber,
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
        {(formik) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                autoComplete="off"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>          
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                required
                fullWidth
                autoComplete="off"
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
             <Field
                component={TextField}
                variant="outlined"
                fullWidth
                name="phonenumber"
                label="Phone Number"
                type="phone"
                id="phonenumber"
                autoComplete="off"/>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
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
      </div>
      <Button fullWidth variant="contained" color="secondary" className={classes.cancelButton} onClick = {deleteCustomerAccount}>Delete Account</Button>
    </Container>
        </div>
       )
      })}
          </div>
          </React.Fragment>
      )
  }
  