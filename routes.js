var express = require('express')
var config = require(__dirname + '/config')
var appDir = config.appDir
var router = express.Router()
var fetchDetails = require(appDir + 'app/controllers/fetchDetails')

router.post('/api/v1/add',fetchDetails.add)

router.post('/api/v1/fetch',fetchDetails.fetch)

module.exports = router