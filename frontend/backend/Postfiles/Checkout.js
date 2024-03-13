const express = require('express');
const router = express.Router();
require('dotenv').config();
const StripeKey = process.env.StripeKey;
const stripe = require("stripe")(StripeKey);


router.post("/checkout", async (req, res) => {
    try {
        const {products} = req.body;
       
       

        if (!products || products.length === 0) {
            throw new Error('Products array is empty or not provided.');
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.productname,
                    images: [product.productimagePath]
                },
                unit_amount: product.productprice * 100,
            },
            quantity: product.productquantity
        }));

        if (lineItems.length === 0) {
            throw new Error('No line items found in the products array.');
        }

        // Create a Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success", // Replace with your actual HTTPS success URL
            cancel_url: "http://localhost:3000/cancel", // Replace with your actual HTTPS cancel URL
        });

        // Respond with the session ID
        res.json({ id: session.id });
    } catch (error) {
        // Handle errors and respond with an error message
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;