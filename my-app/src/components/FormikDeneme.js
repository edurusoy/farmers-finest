
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link, useHistory, Redirect} from 'react-router-dom';
import app from "../fbase";


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to={'/Home'} style={{ textDecoration: 'none' }}>
          Farmer`s Finest
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    styling:{
      background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)'
  },
  linkStyle:{
    textDecoration: 'none',
 }
  }));
  

export default function FormikDeneme() {
    const classes = useStyles();
    const [accounttype, setAccounttype] = useState("");
    const history = useHistory();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const signUpSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(2, "Too short for a first name")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(2, "Too short for a last name")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password should be greater than or equal 6 characters")
        .required("Password is required"),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
    });

    const handleClickFarmer = () =>{
      setAccounttype("farmer");
      console.log(accounttype);
    }

    const handleClickCustomer = () =>{
      setAccounttype("customer");
      console.log(accounttype);
    }

    async function postDataFarmer(farmer) {   
      farmer.firstName = `${farmer.firstName} ${farmer.lastName}`
      const response = await fetch("/SignUpFarmer", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(farmer),
      });
      console.log(response.status);
      return response;
    }
    async function postDataCustomer(customer) { 
      customer.firstName = `${customer.firstName} ${customer.lastName}`  
      const response = await fetch("/SignUpCustomer", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(customer),
      });
      console.log(response.status);
      return response;
    }

    async function handleSubmit(values) {
      try {
        console.log(values);
        if(accounttype==="farmer"){
          const response = await postDataFarmer(values);
          await app
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password);
          if (response.ok) {
            console.log(response.status);
            history.push("/Home");
          } else {
            console.log(response.status);
          }
        }else{
          const response = await postDataCustomer(values);
          await app
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password);
          if (response.ok) {
            console.log(response.status);
            history.push("/Home");
          } else {
            console.log(response.status);
          }
        }      
      } catch {
        console.log("catch");
        //setError("Failed to create an account on firebase");
      }
    }

    return (
    <div>
    <Container component="main" maxWidth="xs" >
      <CssBaseline /> 
      <div className={classes.paper} >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <br/>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
        <Button variant="outlined" color="secondary" className={classes.button} startIcon={<StorefrontIcon />} onClick={handleClickFarmer}> Farmer</Button>
        <Button variant="outlined" color="secondary" className={classes.button} startIcon={<ShoppingCartIcon />} onClick={handleClickCustomer}> Customer</Button>
        </ButtonGroup>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
        {(formik) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
             <Field
                component={TextField}
                variant="outlined"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="phone"
                id="phoneNumber"
                autoComplete="current-password"/>
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
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link to={'/SignIn'} className={classes.linkStyle}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
        )}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
        </div>
    )
}
