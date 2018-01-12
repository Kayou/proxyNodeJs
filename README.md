# Proxy

## Install

```bash
npm install
```

## Run

```bash
npm start
```

### Configurations

There are currently 2 configurations:

- [config.js](configs/config.js): for preprod
- [config.prod.js](configs/config.prod.js): for prod

A configuration file is like this:

```javascript
const path = require('path');

module.exports = {
    target: 'https://preprodpromise12apiapp.azurewebsites.net/',
    cert: path.resolve(__dirname, '../certs/Promise12.pfx')
};
```

- `target`: the remote url to proxy request to.
- `cert`: the path to the certificate pfx thing.

### Environment variables

- `ENV`: the default mode proxies request to the preprod environment. Use `ENV=production` to call the prod one.
- `PASSPHRASE`: if needed, the passphrase related to the pfx file.
- `PORT`: the port for the proxy (default: 9000).
- `TOKEN`: the token to identify client. You must pass a header named `token` with the matching value !