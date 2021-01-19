import React, {useState} from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from 'react-router-dom';
import app from "../fbase";
import CardImage from "../images/Apricots.jpg"

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function FarmerStore() {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [withimage, setWithimage] = useState(false);
  const [products, setProducts] = useState([]);

  const productSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    amount: Yup.number().required("Product amount is required"),
    unitPrice: Yup.number().required("Unit price is required"),
    category: Yup.string().required("Product category is required"),
    details: Yup.string(),
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
};

const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //getImage();
  };

  const imageSelectHandler = (event) =>{
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setWithimage(true);
  }

  //async function getImage() {
    //const response = await fetch("/GetImage");
    //const product = await response.json();
    //console.log(product);
  //}

  const getProducts = () =>{
    getProduct();
  }

  async function getProduct() {
    const response = await fetch("/GetProductsFarmer");
    const data = await response.json();
    console.log(data)
    setProducts(data)
  }

  async function imageUploadHandler(){
    const fd = new FormData();
    fd.append('image', image);
    fd.append('imageName', image.name);
    console.log(fd);
    console.log(image);
    const response = await fetch("/UploadImage", {
      method: "POST",
      body: fd,
    });
    console.log(response.status);
    return response;
  }

  async function postDataProduct(product) { 
    const response = await fetch("/AddProduct", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(product),
    });
    console.log(response.status);
    return response;
  }

  async function handleSubmit(values){
    try {
      setOpen(false)
      console.log(values);
        const response = await postDataProduct(values);
        if (response.ok) {
          console.log(response.status);
          //history.push("/Farmer");
        } else {
          console.log(response.status);
        }
      }catch {
        console.log("catch");
        //setError("Failed to create an account on firebase");
      }
      if(withimage===true){
        const response = await imageUploadHandler();
        if (response.ok){
          console.log(response.status);
        }else{
          console.log(response.status);
        }
      }
    }

    async function postProductId(id) { 
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
      deleteProduct();
      return response;
    }
  
    async function deleteProduct() {
      const response = await fetch("/DeleteProduct");
      //const data = await response.json();
      console.log(response.status);

    }

    const deleteHandler = (c)=>{
      postProductId(c.id);
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
          <Button variant ="outlined" color = "inherit" startIcon={<AddIcon/>} onClick={handleClickOpen}>Add New Product</Button>
          </Grid>
          <Grid item>
          <Button variant ="outlined" color = "inherit"  onClick={getProducts}> Show my products</Button>
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
          title="Contemplative Reptile"
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
      <Link to={`/UpdateProduct/${c.id}`} className={classes.linkStyle}>
        <Button size="small" color="primary">
          Edit
        </Button>
        </Link>
        <Button size="small" color="secondary" onClick={deleteHandler.bind(this, c)}>
          Delete
        </Button>
      </CardActions>
      </Card>
      </Grid>
      </React.Fragment>
        )
      })}
      </Grid>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBarDialog}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.titleDialog}>
               Add New Product
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
        <Formik 
        initialValues={{
              productName: "",
              amount: "",
              unitPrice:"",
              category:"",
              details:""
          }} 
          onSubmit={handleSubmit}
          validationSchema={productSchema}
          >
          {(formik) => (
          <Form className={classes.form}>
            <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount of Product"
            name="amount"
            autoComplete="off"
            autoFocus
          />
          <Field
            component={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="unitPrice"
            label="Price per unit"
            name="unitPrice"
            autoComplete="off"
            autoFocus
          />
          <br/>
          <InputLabel >Category</InputLabel>
          <Field
              required
              fullWidth
              name="category"
              label="Category"
              component={Select}
            >
              <MenuItem value={'vegetable'}>Vegetable</MenuItem>
              <MenuItem value={'fruit'}>Fruit</MenuItem>
              <MenuItem value={'diary'}>Diary </MenuItem>
              <MenuItem value={'meats'}>Meat Product</MenuItem>
              <MenuItem value={'other'}>Other Animal Products</MenuItem>
            </Field>
            <br/>
            <br/>
            <Field
            component={TextField}
            multiline
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Details"
            id="details"
            label="Details"
            name="details"
            autoComplete="off"
            autoFocus
          />
          <br/>
    <div className={classes.uploadRoot}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={imageSelectHandler}
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageSelectHandler}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
            <br/>
            <br/>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid}
          >Save</Button>
          </Form>
          )}
        </Formik>
        </div>
        </Container>
      </Dialog>
    </div>
  );
}