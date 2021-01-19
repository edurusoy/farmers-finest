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
import app from "../fbase";
import {Link} from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"

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

export default function CreditCard() {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const history = useHistory();


    const creditCardSchema = Yup.object().shape({
        ownername: Yup.string()
          .min(4, "Too short for a name")
          .required("Name is required"),
        cardnumber: Yup.number()
            .min(16, "Too short for card number")
            .required("Card number is required"),
        lastmonth:Yup.number()
            .min(2,"Please give exact month value")
            .required("Last month is required"),
        lastyear: Yup.number()
            .min(4, "Please give exact year value")
            .required("Last year is required"),
        cvvnumber: Yup.number()
            .min(3,"Please give valid cvv number")
            .required("Cvv number is required"),
      });
    

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};

async function postDataCreditCard(creditCard) {   
    const response = await fetch("/SetCreditCard", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(creditCard),
    });
    console.log(response.status);
    return response;
  }

  async function handleSubmit(values) {
    try{
        console.log(values);
        const response = await postDataCreditCard(values);
        console.log(response.status);
        if (response.ok){
            history.push("/CardsofCustomer");
        }
    } catch {
        console.log("catch");
      }
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
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreditCardIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          New Card
        </Typography>
        <br/>
        <Formik 
        initialValues={{
              ownername: "",
              cardnumber: "",
              lastmonth:"",
              lastyear:"",
              cvvnumber:""
          }} 
          onSubmit={handleSubmit}
          validationSchema={creditCardSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ownername"
            label="Owner Name"
            name="ownername"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cardnumber"
            label="Card Number"
            id="cardnumber"
            autoComplete="off"
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                autoComplete="off"
                name="lastmonth"
                variant="outlined"
                required
                fullWidth
                id="lastmonth"
                label="Last Month"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                variant="outlined"
                required
                fullWidth
                id="lastyear"
                label="Last Year"
                name="lastyear"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                variant="outlined"
                required
                fullWidth
                id="cvvnumber"
                label="CVV"
                name="cvvnumber"
                autoComplete="off"
              />
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
    </Container>
    </React.Fragment>
    )
}
