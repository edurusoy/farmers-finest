import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Background from "../images/signuppage.jpg";
import Slide from '@material-ui/core/Slide';
import Paper from "@material-ui/core/Paper"
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import {Link} from 'react-router-dom'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to={'/Home'} color="inherit" style={{ textDecoration: 'none' }}>
          Farmer`s Finest
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
      styling:{
          background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)'
      },
      linkStyle:{
         textDecoration: 'none',
         color: '#FFF'
      }
  }));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function HomePage() {
    const classes = useStyles();


    return (
        <React.Fragment>
        <CssBaseline />
        <div className = {classes.root}>
        <AppBar position="static" className = {classes.styling}>
        <Toolbar>
          <Link to={"/Home"} className={classes.linkStyle}>
          <Typography variant="h6"  className={classes.title}>
            Farmer`s Finest
          </Typography>
          </Link>
        <Grid container spacing={3} justify = 'flex-end'>
          <Grid item>
          <Link to={'/SignIn'} className={classes.linkStyle}>
          <Button variant="outlined" color="inherit" >Sign In</Button>
          </Link>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
        </div>
        <br/>
        <br/>
        <br/>
    <Container component="main">
      <Paper height="%75" elevation={3} className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${Background})` }}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Easy to reach and reliable to eat.
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Explore Farmer`s Finest and enjoy.
            </Typography>
            <Link to={'/SignUp'}  className={classes.linkStyle}>
            <Button size="large" variant="contained" color="primary">
          Sign Up
        </Button>
        </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
    <Box mt={8}>
        <Copyright />
      </Box>
      </Container>
    </React.Fragment>
    )
}
