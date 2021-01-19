import React from 'react';
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
import StorefrontIcon from '@material-ui/icons/Storefront';
import ReceiptIcon from '@material-ui/icons/Receipt';
import app from "../fbase";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box"
import Background from "../images/farmerpage.png";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";


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
}));

export default function FarmerPage() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};

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
          <Link to={"/Farmer/Store"} className={classes.linkStyle}>
          <Button variant ="outlined" color = "inherit" startIcon={<StorefrontIcon/>}> My Store</Button>
          </Link>
          </Grid>
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
              Welcome to Farmer`s Finest.
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Are you want to sell your organic products?
              <br/>
              We are here to help you :)
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
    <Box mt={8}>
        <Copyright />
      </Box>
      </Container>
    </div>
  );
}