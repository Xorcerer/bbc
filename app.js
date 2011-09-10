
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
var postUtils = require('./utils.js');

app.get('/', function(req, res){
  res.render('index', {
    locals: { title: 'Express' }
  });
});

app.get('/post/:author/:slug', function(req, res){
 postUtils.renderPost(req.param('author'), req.param('slug'),
    function(viewPath, title){
        res.render(viewPath, {
          locals: {
            title: title,
          },
          layout: 'postLayout'
        });
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

