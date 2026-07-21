
const express = require('express');
const path = require('path');

const app = express();

// Crucial: Parse incoming JSON data from your frontend
app.use(express.json());

// Serve your frontend folder publicly
app.use(express.static(path.join(__dirname, '../../frontend')));

// In-memory cart database for your demo
const userCarts = {};

// Handle Add to Cart requests directly
app.post('/cart/:userId', (req, res) => {
    const { userId } = req.params;
    const { item, price } = req.body;

    if (!userCarts[userId]) {
        userCarts[userId] = [];
    }

    userCarts[userId].push({ item, price });
    
    console.log(`Added ${item} to ${userId}'s cart. Total items: ${userCarts[userId].length}`);

    // Send back a success response with the updated count
    res.json({ 
        success: true, 
        message: 'Item added successfully', 
        cartCount: userCarts[userId].length 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
