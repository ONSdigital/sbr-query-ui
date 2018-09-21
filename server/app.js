'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const myParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const version = require('./package.json').version;
const formatDate = require('./formatDate.js');
const compression = require('compression');
const mcache = require('memory-cache');

// To allow hot-reloading, the node server only serves the React.js index.html
// in the /build file if SERVE_HTML is true
const ENV = process.env.ENV;
const SERVE_HTML = (process.env.SERVE_HTML === 'true');

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.SBR_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.SBR_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.SBR_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.SBR_UI_TEST_USER_PASSWORD;
const SECRET = process.env.JWT_SECRET;

const users = {}; // For the user sessions
const startTime = formatDate(new Date());
const TOKEN_EXPIRE = 60 * 60 * 24;

/*
 * Call cache(duration) to cache a response for a certain
 * duration, or an unlimited duration if no duration is passed in.
*/
const cache = (duration) => {
  return (req, res, next) => {
    const url = (req.originalUrl || req.url);
    const key = `__express__${url}`;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    res.sendResponse = res.send;
    res.send = (body) => {
      if (duration === undefined) {
        mcache.put(key, body);
      } else {
        mcache.put(key, body, duration);
      }
      res.sendResponse(body);
    };
    next();
  };
};

const app = express();

app.use(compression()); // gzip all responses
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(myParser.json()); // For parsing body of POSTs

// Serve static assets (static js files for React from 'npm run build')
if (SERVE_HTML) {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// Below is for CORS, CORS is only needed when React/Node are on different ports
// e.g. when testing locally and React is on 3000 and Node is on 3001
if (ENV === 'local') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

// This method needs to be above the serve React code
// If it's below, the get('*') will point all GETs to the React
app.get('/info', cache(), (req, res) => {
  res.send(JSON.stringify({
    version,
    lastUpdate: startTime
  }));
});

// Always return the main index.html, so react-router renders the route in the client
if (SERVE_HTML) {
  app.get('*', cache(), (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

app.post('/login', (req, res) => {
  // Get the username/password from the body of the POST
  const username = req.body.username;
  const password = req.body.password;

  if (ENV === 'local') {
    /*
     * For local environment, need to compare username/password against
     * environment variables. If the provided username/password is correct, a
     * new key:value pair is added to the 'users' variable.
     *
     * key:value
     * username:hashed/salted(role,apiKey)
     *
     */
    if ((username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
      || (username === USER_USERNAME && password === USER_PASSWORD)) {
      const apiKey = 'API Key';

      let role = 'user';
      if (username === ADMIN_USERNAME) {
        role = 'admin';
      }

      const payload = { username, role, apiKey };
      const jToken = jwt.sign(payload, SECRET, {
        expiresIn: TOKEN_EXPIRE
      });

      // Add user to key:value json store
      users[jToken] = { username, role };

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ jToken, username, role }));
    } else {
      // Return 401 NOT AUTHORIZED if incorrect username/password
      res.sendStatus(401);
    }
  } else if (ENV === 'deployed') {
    /*
     * For the deployed environment, the username/password is sent off to the
     * gateway, which will return 200 OK for a correct username/password or
     * 401 UNAUTHORIZED if they are incorrect.
     *
     *
     *
     */
  }
});

app.post('/checkToken', (req, res) => {
  const token = req.body.token;
  if (users[token] !== undefined) {
    jwt.verify(token, SECRET, (err) => {
      if (err) {
        delete users[token];
        res.sendStatus(401);
      } else {
        const decode = jwtDecode(token);
        const username = decode.username;
        const role = decode.role;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ token, username, role }));
      }
    });
  } else {
    res.sendStatus(401);
  }
});

app.post('/logout', (req, res) => {
  const token = req.body.token;
  // Remove user from storage
  delete users[token];
  res.sendStatus(200);
});

module.exports = app;
