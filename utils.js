var fs = require('fs');
var path = require('path');
var extensions = ['txt', 'ejs'];

exports.renderPost = function(author, slug, renderer){
  var postPath = path.join('posts', author, slug);
  extensions.forEach(function(ext){
    var viewPath = postPath + '.' + ext;
    var fullPath = path.join(__dirname, 'views', viewPath);
    path.exists(fullPath, function(exists){
      if (!exists)
        return;
      renderer.call(null, viewPath);
    });
  });
};
