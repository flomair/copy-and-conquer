var ncp = require('ncp').ncp;
var source = require('path').resolve()+'/templates',
    destination = process.env.INIT_CWD +'/templates2';

console.log(process.argv,require('path').resolve(),process.env.INIT_CWD)

ncp.limit = 16;
 
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});
