var config = require(__dirname + '/../../config')
var appDir = config.appDir
var mongodb = require('mongodb');
var server = new mongodb.Server(config.databaseHost, config.databasePort, {});
var db = require(appDir + '/config/db').client
var logger = require(appDir + '/config/logger').loggerObj

var fs = require('fs')
var json2csv = require('json2csv')

const cwmodels = require('cw-models')
, pulseModel = cwmodels.pulse
, moment = require('moment')

module.exports.add = function(req,res) {
  var options = {
    logger : logger,
    db : db
  }

  pulseModel.create(req.body, options).then(function (resultData) {
    res.json({
      success: 'true',
      message: 'success!',
      data:resultData
    })
  })
}

module.exports.fetch = function(req,res) {
  var options = {
    logger : logger,
    db : db
  }
  var toDate = new Date(moment(req.body.to).add(1, 'day').subtract(1, 'second').toISOString())
  var selectionCriteria = {
    requestDate:{
      $gte:new Date(req.body.from).toISOString(),
      $lte:new Date(toDate).toISOString()
    }
  }

  pulseModel.findMany(selectionCriteria,{_id:0,data:0},options).then(function (pulseData){

    var fields = ['requestDate', 'emailId', 'urlPath','method']
    var myData = pulseData
    var csv = json2csv({ data: myData, fields: fields })
    fs.writeFile('adi.csv', csv, function(err) {
      if (err) throw err
      else {
        res.json({
          success: 'true',
          message:'file updated'
        })
      }
    })
    
  },function (err){
     err.sendResponse(res)
  })  
}