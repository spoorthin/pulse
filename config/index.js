'use strict';

const isThere = require('is-there')
    , currentEnv = process.env.NODE_ENV || 'development'
    , envFilePath = __dirname + "/env/" + currentEnv + ".js"

var environmentOptions
  , projectName

if(!isThere(envFilePath))
  console.log("Environment file missing")
else
  environmentOptions = require(envFilePath) 
  projectName = environmentOptions.projectName || "pulse"
module.exports = {
  port: environmentOptions.server.port,
  serverHost: environmentOptions.server.host + ':' +environmentOptions.server.port,
  databaseUrl: environmentOptions.database.path + environmentOptions.database.name,
  databaseHost: environmentOptions.database.host,
  databasePort: environmentOptions.database.port,
  databaseName: environmentOptions.database.name,
  s3bucket: environmentOptions.aws.s3bucket,
  webAppUrl: environmentOptions.web.host + ':' + environmentOptions.web.appPort,
  adminPanelUrl: environmentOptions.web.host + ':' + environmentOptions.web.adminPanelPort,
  appDir: __dirname.match(new RegExp("(.*\/("+ projectName +")\/)(.*)$"))[1]
}  