require('dotenv').config();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const bodyParser = require('body-parser'); // for reading JSON in requests.
const https = require('https');
const rp = require('request-promise');
app.use(bodyParser.json());


if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '/../dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

app.post('/anything-at-all', (req, res) => {
  var url = `https://api.automatedinsights.com/v1/projects/nag-simulator/templates/nagging-parent/outputs?access_token=${process.env.WORDSMITH_KEY}`
    var options = {
      method: 'POST',
      uri: url,
      body: {
        data: req.body
      },
      headers: {
        'User-Agent': 'testing this'
      },
      json: true // Automatically stringifies the body to JSON
    };

// console.log("Server side options:", options.body);
console.log("This is the req body:", req.body);
// debugger;

    // Hit website using request-promises
    rp(options)
      .then(function(resp) {
        // console.log(resp);
        res.send({
          resp: resp
        });
      })
      .catch(function(err) {
        // console.log(err);
        res.send({
          resp: err
        });
      });
});

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
  // eslint-disable-next-line no-console
  // console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
