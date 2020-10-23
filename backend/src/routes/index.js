const express = require('express');
const useraddRoute = require('./useradd.route');
const relationshipaddRoute = require('./relationshipadd.route');
const getrelationshipsRoute = require('./getrelationships.route');
const updaterelationshipRoute = require('./updaterelationship.route');
const getconnections = require('./getconnection.route')
const getusers = require('./getusers.route')
const router = express.Router();

router.use('/useradd', useraddRoute);
router.use('/relationshipadd', relationshipaddRoute);
router.use('/getrelationship', getrelationshipsRoute);
router.use('/getusers',getusers)
router.use('/getconnections',getconnections)
router.use('/updaterelation',updaterelationshipRoute)
module.exports = router;
