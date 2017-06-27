const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

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
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '/../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    import './styles/base.scss';

    import $ from 'jquery';
    $(document).ready(function() {
      var $form = $('.nag-form');
      console.log('hello');

      $form.submit( function(event){
        alert("Thank you for submitting your response! The robots are working...");
        event.preventDefault();
        console.log('yo!');
        var data = {};
        $(".nag").each(function() {
          data[$(this).attr("name")] = Number($(this).val());
        });
        data["firstname"] = $(".nag-string").val();

        console.log(data);

        var wordsmith = require('wordsmith-node-sdk')('process.env.WORDSMITH_KEY', 'Corinne');
        console.log(wordsmith);

        wordsmith.projects.find('nag-simulator')
          .then(function(project) {
            return project.templates.find('nagging-parent');
          })
          .then(function(template) {
            return template.generate(data);
          })
          .then(function(content) {
            $( ".four " ).text(content)
          })
      });
    });
  });
}

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  // eslint-disable-next-line no-console
  console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
