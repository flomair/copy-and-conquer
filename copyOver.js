var ncp = require('ncp').ncp;
var cwd = require('path').resolve();

console.log(process.argv)
return 
ncp.limit = 16;
 
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});