var ncp = require('ncp').ncp;
var source = require('path').resolve()+'/templates',
    destination = process.env.INIT_CWD +'/templates';
ncp.limit = 16;
 
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('created',destination,'\n');
});
