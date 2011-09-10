var fs = require('fs');
var path = require('path');
var fr = require('./fileReader');

var extensions = ['txt', 'ejs'];

function getTitle(postPath){
  f = fr.FileLineReader(postPath);
  return f.nextLine().replace(/<[^>]*>?/g, '');
}
exports.renderPost = function(author, slug, renderer){
  var postPath = path.join('posts', author, slug);
  extensions.forEach(function(ext){
    var viewPath = postPath + '.' + ext;
    var fullPath = path.join(__dirname, 'views', viewPath);
    path.exists(fullPath, function(exists){
      if (!exists)
        return;
      renderer.call(null, viewPath, getTitle(fullPath));
    });
  });
};
