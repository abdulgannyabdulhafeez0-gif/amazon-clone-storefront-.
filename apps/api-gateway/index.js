const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Route to User Service
app.use('/users', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true 
}));

// Route to Cart Service
app.use('/cart', createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true 
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
