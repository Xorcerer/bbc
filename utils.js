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

  // some() will stop at the first callback returns true.
  var postFound = extensions.some(function(ext){
    var viewPath = postPath + '.' + ext;
    var fullPath = path.join(__dirname, 'views', viewPath);

    if (!path.existsSync(fullPath))
        return false;

    renderer.call(null, viewPath, getTitle(fullPath));
    return true; // Break out the some() iteration.
  });

  if (!postFound)
    renderer.call(null, '404.txt', 'Post Not Found');
};
