const express = require('express')
    , bodyParser = require('body-parser')
    , CWCommons = require('cw-commons')   

var config = require(__dirname + '/config')
  , appDir = config.appDir
  , db = require(appDir + '/config/db.js')
  , logger = require(appDir + '/config/logger.js')
  , app = express()
  , loggerObj

app.use(express.static('public'))
// app.use(busboy())
app.use(bodyParser.json({limit: '50mb'}))
app.set('port', process.env.PORT || config.port)

logger.init()
loggerObj = logger.loggerObj
app.use(function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*')
 res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS") 
 res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type")
 res.header("Access-Control-Expose-Headers", "organizationId, cardConfigVersion")
 if (req.method === 'OPTIONS') return res.send(200)
 next()
})

db.init(function(err) {
  var server =  app.listen(app.get('port'), function(){
    loggerObj.info('Express server listening on port ' + server.address().port)
  })  
  var options = {db: db.client, logger: loggerObj, "cw-models": require("cw-models")}
  app.use('/', require(appDir + '/routes'))
})