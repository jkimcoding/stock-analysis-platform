const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(
    '/api',
    createProxyMiddleware({
        // TODO: replace this with backend url
        target: 'http://server:8080' || 'http://localhost:8080' || '127.0.0.1:8080',
        changeOrigin: true,
        logLevel: 'debug',
    })
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});