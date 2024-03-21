const express = require('express');
const connectDb = require("./utils/db")
const cors = require("cors")
const bodyParser = require('body-parser');
const port = 3001;



const userReg = require('./Postfiles/UserRegistration');
const addproduct = require("./Postfiles/AddProduct")
const userLogin=require("./Postfiles/UserLogin")
const getproduct=require("./Getfiles/GetProduct")
const getmobileproduct=require("./Getfiles/GetMobileProduct")
const gettoyproduct=require("./Getfiles/GetToyProduct")
const getdeliveryaddress=require("./Getfiles/GetDeliveryAddress")
const getmensproduct=require("./Getfiles/GetMensProduct")
const getwomensproduct=require("./Getfiles/GetWomensProduct")
const getelectronicproduct=require("./Getfiles/GetElectronicProduct")
const getfootwearproduct=require("./Getfiles/GetFootwear")
const getCartproduct=require("./Getfiles/GetCartProducts")
const addtocart=require("./Postfiles/AddtoCart")
const saveaddress=require("./Postfiles/SaveAddress")
const sellerregister=require("./Postfiles/SellerRegister")
const selleraddress=require("./Postfiles/SellerAddress")
const sellerlogin =require("./Postfiles/SellerLogin")
const getsellerprofile=require("./Getfiles/GetSellerProfile")
const Checkout=require("./Postfiles/Checkout")
const Cartdelete=require("./DeleteFiles/CartDelete")
const GetSearch =require("./Getfiles/GetSearch")
const SellerDelete=require("./DeleteFiles/SellerDelete")
const updateproduct =require("./Updatefiles/updateproduct")
const reupdateProduct=require("./Updatefiles/Reupdateproduct")
const Orderdetail=require("./Postfiles/Orderdetail")
const getorderproducts =require("./Getfiles/GetOrderProduct")
const password =require("./Postfiles/Password")
const ResetPassword=require("./Updatefiles/ResetPassword");
const SellerForgot=require("./Postfiles/SellerForgotPassword")
const sellerresetpassword=require("./Updatefiles/SellerResetPassword")
const updateorder =require("./Updatefiles/updateOrders") 
const updatetotalsales =require("./Updatefiles/UpdateTotalsales")
const contact =require("./Postfiles/Contact")


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') {
    res.status(204).send();
  } else {
    next();
  }
});




app.use(userReg);
app.use(addproduct);
app.use(userLogin);
app.use(addtocart);
app.use(saveaddress);
app.use(sellerregister);
app.use(selleraddress);
app.use(sellerlogin);
app.use(Checkout);
app.use(Orderdetail);
app.use(password)
app.use(SellerForgot)
app.use(contact)


app.use(getproduct);
app.use(getmobileproduct);
app.use(gettoyproduct);
app.use(getmensproduct);
app.use(getwomensproduct);
app.use(getelectronicproduct);
app.use(getfootwearproduct);
app.use(getCartproduct);
app.use(getdeliveryaddress);
app.use(getsellerprofile);
app.use(GetSearch);
app.use(getorderproducts);



app.use(Cartdelete);
app.use(SellerDelete);


app.use(updateproduct);
app.use(reupdateProduct);
app.use(ResetPassword);
app.use(sellerresetpassword)
app.use(updateorder)
app.use(updatetotalsales)

connectDb().then(() => {
  app.listen(port, () => {




    console.log(`Server is running on port ${port}`);
  });

})