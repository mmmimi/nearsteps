const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/orders");
// für PUT und PATCH requests
const methodOverride = require("method-override");
// ejs-mate für die templates - ich nenne es hier einfach ejsMate
const ejsMate = require("ejs-mate");

//Get customerRoutes
const customerRoutes = require("./routes/customers");
const ordersRoutes = require("./routes/orders");

const dbUrl = process.env.DB_URL;
console.log(dbUrl);
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});

const app = express();
//damit auch req.body übermittelt wird
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//init ejsMate
app.engine("ejs", ejsMate);
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/orders", async (req, res) => {
  const orders = await Order.find({});
  res.render("orders/index", { orders });
});

app.use(express.static(path.join(__dirname, "public")));

//CUSTOMERS
app.use("/customers", customerRoutes);

//ORDERS
app.use("/orders", ordersRoutes);

//All Route
app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
