
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path'); // 1. Added path module

const app = express();

// 2. Serve your frontend folder publicly (placed before routes so it loads index.html at root)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Route to User Service with pathRewrite
app.use('/users', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true,
    pathRewrite: { '^/users': '' }
}));

// Route to Cart Service with pathRewrite
app.use('/cart', createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true,
    pathRewrite: { '^/cart': '' }
}));

// Fallback home route (optional now that static frontend is active)
app.get('/api-status', (req, res) => {
    res.send('API Gateway is online and ready to route traffic!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
