const express = require("express");
require("./database/config");
const cors = require("cors");
const app = express();
const { req, res } = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");

const Category = require("./models/Categories");
var fs = require("fs");

// import routes files
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoutes");
// import routes files

const auth = require("./middleware/auth");

const User = require("./models/Users");
const destination = multer({
  dest: "public/",
});
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies using qs library
app.use(express.json()); // Used to parse JSON bodies

app.use(cors());
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

app.post("/add-product", upload.single("productImage"), async (req, res) => {
  console.log(req, 36);
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    productImage: req.file.originalname,
  });
  product
    .save()
    .then(() => res.json("product added"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// add product
// app.post("/add-product", upload, async (request, response) => {
//   console.log(request.body, request.file, 50);
//   request.header("Access-Control-Allow-Origin", "*");
//   request.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   request.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// data.append("title", title);
// data.append("description", description);
// data.append("price", price);
// data.append("category", category);
// data.append("quantity", quantity);
// data.append("productImage", productImage);
//   const payload = {
//     title: request.body.title,
//     description: request.body.description,
//     price: request.body.price,
//     catagory: request.body.category,
//     quantity: request.body.quantity,
//     status: request.body.status,
//     image: request.file.path,
//   };
//   console.log(payload, 59);
//   let product = new Product(payload);
//   let result = await product.save();
//   if (result) {
//     response.send(result);
//   } else {
//     response.status(200).json({ message: "Product not added." });
//   }
// });

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
app.get("/products", async (request, response) => {
  let product = await Product.find().sort({ title: 1 });
  response.send(product);
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
app.delete("/delete/:_id", async (request, response) => {
  console.log(request.params);
  const result = await Product.deleteOne(request.params);
  if (result.acknowledged) {
    response.send({
      message: "Product successfully deleted!",
      status: 200,
    });
  }
});

/*---------------- CATEGORIES ROUTES ----------------*/

// app.get("/category", async (request, response) => {
//   let catagory = await Catagory.find({
//     status: 1,
//   });
//   response.send(catagory);
// });

// ----------------------------------------------

app.listen(5000);
