const express = require('express');
const getConnection = require('../controllers/getconnection.controller');
const router = express.Router();

router
  .route('/')
  .get(getConnection.getConnection)

module.exports = router;
