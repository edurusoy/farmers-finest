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



export default function ProductPage() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('panel1');
    const [state, setState] = useState(false);
    const {id} = useParams();
    const [infdata, setInfdata] = useState([]);

    if (infdata.length < 1) {
        postProductId();
      }


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
    };
    
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
        getProductandFarmer();
        return response;
      }

      async function getProductandFarmer() {
        const response = await fetch("/GetProductandFarmer");
        const data = await response.json();
        console.log(data);
        setInfdata(data);
      }

    return (
    <React.Fragment>
    <div className={classes.root}>
      <AppBar position="static" className={classes.styling}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Farmer`s Finest
          </Typography>
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
                  <ListItem button >
                    <ListItemIcon> {<PersonOutlineIcon/>} </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button >
                    <ListItemIcon> {<EditIcon/>} </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                  <ListItem button >
                    <ListItemIcon> {<ExitToAppIcon/>} </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                  <ListItem button >
                    <ListItemIcon> {<ReceiptIcon/>} </ListItemIcon>
                    <ListItemText primary="Order Info" />
                  </ListItem>
                  <ListItem button >
                    <ListItemIcon> {<LocationOnIcon/>} </ListItemIcon>
                    <ListItemText primary="Address" />
                  </ListItem>
              </List>   
            </div>
          </Drawer>
        </React.Fragment>
        </div>
      </AppBar>
      </div>
        <div>
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordionStyling}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Product Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Informations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {infdata.map((row) => (
            <React.Fragment>
            <TableRow>
                <TableCell>Product Name:</TableCell>
                <TableCell>{row.name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Category:</TableCell>
            <TableCell>{row.category}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Amount:</TableCell>
            <TableCell>{row.amount}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Unit Price:</TableCell>
            <TableCell>{`${row.price} Tl`}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Avarage Rate:</TableCell>
            <TableCell>{row.rate}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Details:</TableCell>
            <TableCell>{row.details}</TableCell>
        </TableRow>
        </React.Fragment>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Farmer Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Farmer Informations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {infdata.map((row) => (
            <React.Fragment>
            <TableRow>
                <TableCell>Farmer Name:</TableCell>
                <TableCell>{row.farmerName}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Email:</TableCell>
            <TableCell>{row.email}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Phone Number:</TableCell>
            <TableCell>{row.phone}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Avarage Farmer Rate:</TableCell>
            <TableCell>{row.farmerRate}</TableCell>
        </TableRow>
        </React.Fragment>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
    </React.Fragment>
    )
}
