const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Cart Service is running!');
});

app.listen(3002, () => {
    console.log('Cart Service running on port 3002');
});
