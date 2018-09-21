'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint no-console: "off" */

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.maxSockets = 500;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
