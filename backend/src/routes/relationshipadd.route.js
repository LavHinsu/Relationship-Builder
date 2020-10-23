const express = require('express');
const relationshipaddController = require('../controllers/relationshipadd.controller');
const router = express.Router();

router
  .route('/')
  .post(relationshipaddController.createRelationship)

module.exports = router;
