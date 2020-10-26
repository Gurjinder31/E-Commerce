const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { default: Stripe } = require("stripe");
const { response } = require("express");
const stripe = require("stripe")(<Private Token>);

//-API

//-App config
const app = express();

//-Middlewares

// cors as security
app.use(cors({ origin: true }));
app.use(express.json());

//-API routes
app.get("/", (req, res) => res.status(200).send("hello  world"));

app.post("/payments/create", async (req, res) => {
  // ?total=    can use param as well
  const total = req.query.total;

  console.log("paymenr Request Recieves BOOM!! for this amoint ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "cad",
  });
  // ok-created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen command

// cloud funtion to run on cloud function firebase
exports.api = functions.https.onRequest(app);

// initalize with command firesbase emulator:start:
// then copy URL

// example endpoint
// http://localhost:5001/e-commerce-6011b/us-central1/api
