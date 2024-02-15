// Importing necessary modules
const express = require('express');
require('dotenv').config();

// Creating an Express application
const app = express();
const Stripe = require('stripe');


// Accessing environment variables
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password123';
const stripe_secret = process.env.STRIPE_SECRET_KEY;
const dbName = process.env.DB_NAME;

const stripe = require('stripe')(stripe_secret);


app.get('/products', async (req, res) => {
    
    const products = await stripe.products.list({
        limit: 3,
    });
    res.send(products);

});

// Define a route for a sample endpoint
app.get('/product/:id', async (req, res) => {

    const productID = req.params.id;
    const product = await stripe.products.retrieve(productID);

    res.json(product);
});

// Define a route with a dynamic parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Handling 404 Not Found
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!")
});





// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
