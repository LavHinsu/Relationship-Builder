const express = require('express');
const getConnection = require('../controllers/getconnection.controller');
const router = express.Router();

router
  .route('/')
  .post(getConnection.getConnection)

module.exports = router;
