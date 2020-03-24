const express = require('express');
const timeout = require('connect-timeout');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const { HOST = 'http://127.0.0.1:8000', PORT = '8080' } = process.env;

const TIME_OUT = 30 * 1e3;

app.set('port', PORT);

app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use('/', express.static('build'));

app.use(createProxyMiddleware('/api/', { target: HOST, ws: false }));
app.use(createProxyMiddleware('/pca/', { target: HOST, ws: false }));

app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});
