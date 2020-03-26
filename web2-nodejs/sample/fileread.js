var fs = require('fs');
fs.readFile('sample/sample.txt', 'utf8', function(err, data){
  console.log(data);
});
