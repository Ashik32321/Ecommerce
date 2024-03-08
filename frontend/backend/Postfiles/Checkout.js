const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51OcqX2SI1KcZYWZzYAXkOBBKbnPyXZyiyTEAVqYm88xfSK8ofZI6remM29RWlFc2b54lSL4XFVOgoJeujFMgVP2c00vDG3fcgl");


router.post("/checkout", async (req, res) => {
    try {
        const {products} = req.body;
       
        console.log('Request Body:', JSON.stringify(req.body)); // Log the request body for debugging

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