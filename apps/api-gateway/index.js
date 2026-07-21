
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Route to User Service with pathRewrite
app.use('/users', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true,
    pathRewrite: { '^/users': '' } // This hides the "/users" from the internal service
}));

// Route to Cart Service with pathRewrite
app.use('/cart', createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true,
    pathRewrite: { '^/cart': '' } // This hides the "/cart" from the internal service
}));

// Fallback home route
app.get('/', (req, res) => {
    res.send('API Gateway is online and ready to route traffic!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
