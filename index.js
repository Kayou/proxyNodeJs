const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const httpProxy = require('http-proxy');

const port = process.env.PORT || 9000;

const config = path.resolve(__dirname, process.env.ENV === 'production' ? './configs/config.prod.js' : './configs/config.js');
const { target} = require(config);

console.log('Proxying to', target);

//for iot service
const options = {
  target: Object.assign(url.parse(target))
};

console.log(target);

//for eulerhermes service
const eulerhermesOptions = {
  target: Object.assign(url.parse(target)),
  changeOrigin: true,
}

function setHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
}

const proxy = httpProxy.createProxyServer(options);
const eulerhermesProxy = httpProxy.createProxyServer(eulerhermesOptions);

proxy.on('proxyRes', (proxyRes, req, res) => {
  setHeaders(res);
});

eulerhermesProxy.on('proxyRes', (proxyRes, req, res) => {
  setHeaders(res);
});

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  const mainProxy = req.headers.apitype === 'eulerhermes' ? eulerhermesProxy : proxy;
  mainProxy.web(req, res, (err) => {
    console.log('Error', err);
     if (!res.headersSent) {
      res.statusCode = 502;
      res.end('bad gateway');
    }
  });
});

console.log(`listening on port ${port}`);

server.listen(port);
