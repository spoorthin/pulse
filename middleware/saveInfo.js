var request = require('request')

module.exports = function (req,res,next) {
  var options = {
    url: 'http://localhost:8000/api/v1/add',
    method: 'POST',
    headers: {'content-type': 'application/json'},
      json:{
      data:req.body,
      requestDate:new Date(),
      emailId:req.headers['x-email-id'],
      urlPath:req.originalUrl,
      method:req.method
    }
  }
  request.post(options, function (error, response, body) {
    if (error) {console.log('error connecting to server',error)}
  }) 
  next()  
}