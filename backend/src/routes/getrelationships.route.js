const express = require('express');
const getreltaionshipController = require('../controllers/getrelationship.controller');
const router = express.Router();

router
  .route('/')
  .get(getreltaionshipController.getRelationship)

module.exports = router;
