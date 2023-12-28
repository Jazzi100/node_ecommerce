const express = require("express");
require("./database/config");
const cors = require("cors");
const app = express();
const { req, res } = require("express");
const multer = require("multer");
const path = require("path");
var fs = require("fs");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// import models
const Product = require("./models/Product");
const Category = require("./models/Categories");
const User = require("./models/Users");


// import routes files
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoutes");

// import routes files
const auth = require("./middleware/auth");



const destination = multer({
  dest: "public/",
});
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies using qs library
app.use(express.json()); // Used to parse JSON bodies

app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'supersecret_dont_share',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 15
  }
}));
app.use(express.static("./"));

app.use((req, res, next) => {
  console.log("Req:", req.url);
  next();
});



/*---------------- USER ROUTES ----------------*/

app.use("/api/user", userRoute);

app.use("/api/product", productRoute);

app.use("/api/category", categoryRoute);

app.use("/api/cart", cartRoute);

app.get("/users", async (request, response) => {
  let users = await User.find().sort({ firstName: 1 });
  if (users) {
    response
      .status(200)
      .send({ users: users, message: "users found", success: true });
  } else {
    response.status(500).send({ message: "Users not found", success: false }); 
  }
});

/*---------------- PRODUCTS ROUTES ----------------*/
//Multer Function
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});

// file upload middleware
const upload = multer({
  storage: Storage,
});



//get product by id
app.get("/product/:id", async (request, response) => {
  let result = await Product.findOne({
    _id: request.params.id,
  });
  if (result) {
    response.send(result);
  } else {
    response.send({ result: "No Record Found" });
  }
});

//update product by id
app.put("/product/:id", async (request, response) => {
  let result = await Product.updateOne(
    { _id: request.params.id },
    {
      $set: request.body,
    }
  );
  if (result) {
    response.send(result);
  }
});

//get all products
app.get("/products", async (req, res) => {
  let product = await Product.find().sort({ title: 1 }).populate('catagory_id');
  // if(req.session.existingUser){
  //   res.send({product: products,valid: true});
  // }else{
  //   res.send({valid: false});
  // }
  console.log("line no 129 index.js : " ,req.session.existingUser);
  res.send(product);
});

//Add Product
// app.post(
//   "/add-product",
//   upload.single("productImage"),
//   async (request, response) => {
//     console.log(request.body, request.file, 50);
//     const payload = {
//       title: request.body.title,
//       description: request.body.description,
//       price: request.body.price,
//       quantity: request.body.quantity,
//       status: request.body.status,
//       image: request.file.path,
//     };
//     console.log(payload, 75);
//     let product = new Product(payload);
//     let result = await product.save();
//     if (result) {
//       response.send(result);
//     } else {
//       //response.status(200).json({ message: "Product not added." });
//       response.send("product added failed...");
//     }
//   }
// );

// change status
app.put("/product-status/:id", async (request, response) => {
  console.log(request.body.status);
  let result = await Product.updateOne(
    { _id: request.params.id },
    {
      $set: { status: request.body.status },
    }
  );
  if (result) {
    response.send(result);
  } else {
    response.status(200).json({ message: "Product status updated." });
  }
});

// Delete Product
// app.delete("/delete/:_id", async (request, response) => {
//   console.log(request.params);
//   const result = await Product.deleteOne(request.params);
//   if (result.acknowledged) {
//     response.send({
//       message: "Product successfully deleted!",
//       status: 200,
//     });
//   }
// });

/*---------------- CATEGORIES ROUTES ----------------*/

// app.get("/category", async (request, response) => {
//   let catagory = await Catagory.find({
//     status: 1,
//   });
//   response.send(catagory);
// });

// ----------------------------------------------

app.listen(5000, ()=>{
  console.log("Connected to the server");
});
