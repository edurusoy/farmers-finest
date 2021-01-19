import React, {useState} from 'react'
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import app from "../fbase";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CreditCardIcon from '@material-ui/icons/CreditCard';


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
  linkStyle:{
    textDecoration: 'none',
    color: '#FFF'
  },
  linkStylewotcolor:{
    textDecoration: 'none',
    color: ' #625750'
  }
  }));

  
  export default function CustomerProfilePage() {
    const [profile, setProfile] = useState([])
    const classes = useStyles();
    const [state, setState] = useState(false);

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
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Profile Informations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <React.Fragment>
            <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{c.name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Email:</TableCell>
            <TableCell>{c.email}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Phone Number:</TableCell>
            <TableCell>{c.phonenumber}</TableCell>
        </TableRow>
        </React.Fragment>
        </TableBody>
        <br/>
        <br/>
        </Table>
        <br/>
        <br/>
        </TableContainer>
       )
      })}
          </div>
          </React.Fragment>
      )
  }
  