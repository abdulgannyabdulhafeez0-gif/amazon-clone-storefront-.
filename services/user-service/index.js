const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('User Service is working!');
});

app.listen(3001, () => {
    console.log('User Service running on port 3001');
});
