const express = require('express');
const updaterelationshipController = require("../controllers/updaterelationship.controller")
const router = express.Router();

router
  .route('/')
  .post(updaterelationshipController.updateRelationship)

module.exports = router;
