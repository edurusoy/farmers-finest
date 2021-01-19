import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
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
import {useParams} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Link} from 'react-router-dom';
import app from "../fbase";
import AddIcon from '@material-ui/icons/Add';


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
    background: 'linear-gradient(45deg, #6b5b95, #b8a9c9)'
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

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);


  export default function FarmerAddresses() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('panel1');
    const [state, setState] = useState(false);
    const {id} = useParams();
    const [addressinfdata, setInfdata] = useState([]);
    

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
    };


    if(addressinfdata.length < 1){
      getFarmerAddresses();
    }
    
      async function getFarmerAddresses() {
        const response = await fetch("/GetFarmerAddresses");
        const data = await response.json();
        console.log(data);
        setInfdata(data);
      }


      async function postSellingAddressId(id) { 
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
        deleteFarmerAddresses();
        return response;
      }
    
      async function deleteFarmerAddresses() {
        const response = await fetch("/DeleteSellingAddresses");
        //const data = await response.json();
        console.log(response.status);

      }

      const deleteHandler = (c)=>{
        postSellingAddressId(c.addressid);
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
          <Link to={"/AddSellingAddress"} className={classes.linkStyle}>
          <Button variant ="outlined" color = "inherit" startIcon={<AddIcon/>} > New Selling Address</Button>
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
      </div>
        <div>
        {addressinfdata.map((c) => {
          return(
        <Accordion square expanded={expanded === c.addressid} onChange={handleChange(c.addressid)} className={classes.accordionStyling}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{`Selling Address ${c.addressid}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Address Informations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <React.Fragment>
            <TableRow>
                <TableCell>City:</TableCell>
                <TableCell>{c.city}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Address:</TableCell>
            <TableCell>{c.address}</TableCell>
        </TableRow>
        </React.Fragment>
        </TableBody>
        <br/>
        <br/>
        <ButtonGroup variant="contained" color="primary" aria-label="contained secondary button group">
        <Link to={`/SellingAddressUpdate/${c.addressid}`} className={classes.linkStyle}>
        <Button variant="contained" color="primary">Update address</Button>
        </Link>
        <Button variant="contained" color="secondary" onClick={deleteHandler.bind(this, c)}>Delete address</Button>
      </ButtonGroup>
        </Table>
        <br/>
        <br/>
        </TableContainer>
        </AccordionDetails>
      </Accordion>
       )
      })}
    </div>
    </React.Fragment>
    )
}
