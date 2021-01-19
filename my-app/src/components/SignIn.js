import React, {useState, useContext} from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AuthContext } from "./Auth";
import app from "../fbase";
import {useHistory, Link} from "react-router-dom";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  styling:{
    background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)'
},
  cancelButton:{
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main
  },
  linkStyle:{
    textDecoration: 'none'
 }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [accounttype, setAccounttype] = useState("");
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const {handleClose} = props;

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleClickCustomer = () =>{
    setAccounttype("customer");
    console.log(accounttype);
  }

  const handleClickFarmer = () =>{
    setAccounttype("farmer");
    console.log(accounttype);
  }

  async function postDataFarmer(farmer) {   
    const response = await fetch("/SignInFarmer", {
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
    const response = await fetch("/SignInCustomer", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(customer),
    });
    console.log(response.status);
    return response;
  }

  async function handleSubmit(values){
    try {
      console.log(values);
      if(accounttype==="farmer"){
        const response = await postDataFarmer(values);
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        if (response.ok) {
          console.log("okkkk farmer");
          console.log(response.status);
          history.push("/Farmer");
        } else {
          console.log("siktir ya farmer");
          console.log(response.status);
        }
      }else{
        const response = await postDataCustomer(values);
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        if (response.ok) {
          console.log(response);
          console.log("okkkk customer");
          console.log(response.status);
          history.push("/Customer");
        } else {
          console.log("siktir ya customer");
          console.log(response.status);
        }
      }      
    } catch {
      console.log("catch");
      //setError("Failed to create an account on firebase");
    }
  }

      
  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <br/>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
        <Button variant="outlined" color="secondary" className={classes.button} startIcon={<StorefrontIcon />} onClick={handleClickFarmer}> Farmer</Button>
        <Button variant="outlined" color="secondary" className={classes.button} startIcon={<ShoppingCartIcon />} onClick={handleClickCustomer}> Customer</Button>
        </ButtonGroup>
        <Formik 
        initialValues={{
              email: "",
              password: "",
          }} 
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/SignUp'} className={classes.linkStyle}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}