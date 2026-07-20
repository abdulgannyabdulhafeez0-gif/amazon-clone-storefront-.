const express = require('express');
const app = express();

// Allows your service to read JSON data sent from your mobile storefront frontend
app.use(express.json()); 

// A temporary in-memory storage for your carts
let globalCarts = {};

// 1. Route to view a specific user's cart
app.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const userCart = globalCarts[userId] || [];
    res.json({ userId, items: userCart });
});

// 2. Route to add an item to the cart
app.post('/add', (req, res) => {
    const { userId, productId, name, price, quantity } = req.body;
    
    if (!userId || !productId) {
        return res.status(400).json({ error: 'Missing userId or productId' });
    }

    if (!globalCarts[userId]) {
        globalCarts[userId] = [];
    }

    // Check if this item is already in the user's cart
    const existingItem = globalCarts[userId].find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += (quantity || 1);
    } else {
        globalCarts[userId].push({
            productId,
            name,
            price,
            quantity: quantity || 1
        });
    }

    res.json({ message: 'Item successfully added to cart', cart: globalCarts[userId] });
});

app.listen(3002, () => {
    console.log('Cart Service running on port 3002');
});
