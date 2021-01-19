import React, {useState}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import app from "../fbase";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import CardImage from "../images/Apricots.jpg"

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
    cardRoot: {
        maxWidth: 345,
        minWidth: 200,
      },
      media: {
        height: 140,
      },
      gridStyling:{
        marginTop: '60px'
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

  export default function ShopPage() {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState([]);
    const [cards, setCards] = useState([]);
    const [farmer, setFarmer] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");


    const orderSchema = Yup.object().shape({
        numberofunit: Yup.number()
          .required("Quantity of order is required"),
        paymentmethod: Yup.string().required("Payment method is required"),
        deliveryaddress: Yup.string().required("Delivery address is required"), 
      });

    

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};

if(products.length < 1){
    getAllProduct();
}

if(address.length < 1){
    getAdress();
}

if(cards.length < 1){
    getCards();
}

async function getAllProduct() {
    const response = await fetch("/GetAllProducts");
    const data = await response.json();
    console.log(data)
    setProducts(data)
  }

  async function getAdress() {
    const response = await fetch("/GetDeliveryAddress");
    const data = await response.json();
    console.log(data)
    setAddress(data)
  }

  async function getCards() {
    const response = await fetch("/GetCreditCards");
    const data = await response.json();
    console.log(data)
    setCards(data)
  }

  const handleClickOpen = (c) => {
    setOpen(true);
    setFarmer(c.farmer);
    setProduct(c.id);
    setPrice(c.price);
    console.log(farmer);
    console.log(product);
    console.log(price);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function postDataOrder(order) { 
    const orderObj = {
        productid: product,
        farmerid: farmer,
        price: price,
        numberofunit: order.numberofunit,
        paymentmethod: order.paymentmethod,
        deliveryaddress: order.deliveryaddress,
      };
    const response = await fetch("/SetOrder", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(orderObj),
    });
    console.log(response.status);
    return response;
  }

  async function handleSubmit(values) {     
    try{
        console.log(values);
        const response = await postDataOrder(values);
        console.log(response.status);
        if (response.ok){
            setOpen(false);
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
    <Grid container spacing ={3} justify="center" className={classes.gridStyling}>
        {products.map((c) => {
            return(
          <React.Fragment>
          <Grid item>
        <Card className={classes.cardRoot}>
      <Link to={`/Product/${c.id}`} className={classes.linkStylewotcolor}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${CardImage}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {c.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {c.details}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen.bind(this, c)}>
          Give Order
        </Button>
      </CardActions>
      </Card>
      </Grid>
      </React.Fragment>
        )
      })}
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill order informations.
          </DialogContentText>
          <Formik 
        initialValues={{
              numberofunit: "",
              paymentmethod: "",
              deliveryaddress:""
          }} 
          onSubmit={handleSubmit}
          validationSchema={orderSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="numberofunit"
            label="Number of unit"
            id="numberofunit"
            autoComplete="off"
          />
          <br/>
          <br/>
          <InputLabel >Payment Method</InputLabel>
          <Field
              required
              fullWidth
              name="paymentmethod"
              label="Payment Method"
              component={Select}
            >
            {cards.map((c) => {
                return(
              <MenuItem value={c.id}>{`Owner Name: ${c.ownername} Card Number: ${c.cardnumber}`}</MenuItem>
              )
            })}
            </Field>
            <br/>
            <br/>
            <InputLabel >Delivery Address</InputLabel>
          <Field
              required
              fullWidth
              name="deliveryaddress"
              label="Delivery Address"
              component={Select}
            >
            {address.map((c) => {
                return(
              <MenuItem value={c.id}>{`City: ${c.city} Address: ${c.deliveryaddress}`}</MenuItem>
              )
            })}
            </Field>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
    )
}
