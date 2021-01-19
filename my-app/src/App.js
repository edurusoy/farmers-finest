
import './App.css';
import HomePage from "./components/HomePage"
import SignIn from "./components/SignIn"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import CustomerPage from "./components/CustomerPage"
import FormikDeneme from "./components/FormikDeneme"
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import FarmerPage from "./components/FarmerPage"
import FarmerStore from "./components/FarmerStore"
import ProductPage from "./components/ProductPage"
import AddCreditCard from "./components/AddCreditCard"
import AddDeliveryAddress from "./components/AddDeliveryAddres"
import AddSellingAddress from "./components/AddSellingAddress"
import ShopPage from "./components/ShopPage"
import CustomerOrders from "./components/CustomerOrders"
import CustomerAddresses from "./components/CustomerAdresses"
import UpdateDeliveryAddress from "./components/UpdateDeliveryAddress"
import CustomerCreditCards from "./components/CreditCards"
import UpdateCreditCard from "./components/UpdateCreditCard"
import CustomerProfile from "./components/CustomerProfilePage"
import FarmerProfile from "./components/FarmerProfilePage"
import EditCustomerProfile from "./components/EditCustomerProfile"
import EditFarmerProfile from "./components/EditFarmerProfile"
import UpdateProduct from "./components/UpdateProduct"
import FarmerAddresses from "./components/FarmerAddresses"
import UpdateSellingAddress from "./components/UpdateSellingAddress"
import FarmerOrders from "./components/FarmerOrders"

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/Home' component={HomePage}/>
          <Route exact path='/SignIn' component={SignIn}/>
          <Route exact path='/SignUp' component={FormikDeneme}/>
          <PrivateRoute exact path='/Customer' component={CustomerPage}/>
          <PrivateRoute exact path='/Farmer' component={FarmerPage}/>
          <PrivateRoute exact path='/Farmer/Store' component={FarmerStore}/>
          <PrivateRoute exact path='/Product/:id' component={ProductPage}/>
          <PrivateRoute exact path='/AddCreditCard' component={AddCreditCard}/>
          <PrivateRoute exact path='/AddDeliveryAddress' component={AddDeliveryAddress}/>
          <PrivateRoute exact path='/AddSellingAddress' component={AddSellingAddress}/>
          <PrivateRoute exact path='/Shop' component={ShopPage}/>
          <PrivateRoute exact path='/OrdersofCustomer' component={CustomerOrders}/>
          <PrivateRoute exact path='/AddressesofCustomer' component={CustomerAddresses}/>
          <PrivateRoute exact path='/DeliveryAddressUpdate/:id' component={UpdateDeliveryAddress}/>
          <PrivateRoute exact path='/CardsofCustomer' component={CustomerCreditCards}/>
          <PrivateRoute exact path='/CreditCardUpdate/:id' component={UpdateCreditCard}/>
          <PrivateRoute exact path='/CustomerProfile' component={CustomerProfile}/>
          <PrivateRoute exact path='/FarmerProfile' component={FarmerProfile}/>
          <PrivateRoute exact path='/EditCustomerProfile' component={EditCustomerProfile}/>
          <PrivateRoute exact path='/EditFarmerProfile' component={EditFarmerProfile}/>
          <PrivateRoute exact path='/UpdateProduct/:id' component={UpdateProduct}/>
          <PrivateRoute exact path='/AddressesofFarmer' component={FarmerAddresses}/>
          <PrivateRoute exact path='/SellingAddressUpdate/:id' component={UpdateSellingAddress}/>
          <PrivateRoute exact path='/OrdersofFarmer' component={FarmerOrders}/>
        </Switch>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
