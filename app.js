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
//rendern der NEW form
app.use("/customers", customerRoutes);

//ORDERS
app.use("/orders", ordersRoutes);
//rendern der NEW form
// app.get('/orders/new', (req, res) => {
//     res.render('orders/new')
// })
//Route für den POST der Form Übermittlung
// app.post('/orders', async (req, res) => {
//     const order = new Order(req.body.order)
//     await order.save()
//     res.redirect(`/orders/${order._id}`)
// })

// app.get('/orders/:id', async (req, res) => {
//     const order = await Order.findById(req.params.id)
//     res.render('orders/show', { order })
// })

// //EDIT form rendern
// app.get('/orders/:id/edit', async (req, res) => {
//     const order = await Order.findById(req.params.id)
//     res.render('orders/edit', { order })
// })

// app.put('/orders/:id', async (req, res) => {
//     const { id } = req.params
//     const order = await Order.findByIdAndUpdate(id, { ...req.body.order }, { new: true })
//     res.redirect(`/orders/${order._id}`)
// })

// app.delete('/orders/:id', async (req, res) => {
//     const { id } = req.params
//     const order = await Order.findByIdAndDelete(id)
//     res.redirect('/orders')
// })

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
