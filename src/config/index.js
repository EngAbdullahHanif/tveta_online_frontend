let config;

if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'production') {
    config = require('./production');
  } else {
    config = require('./development');
  }
} else {
  conig = require('./development');
}

export default config;
