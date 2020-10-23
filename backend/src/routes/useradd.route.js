const express = require('express');
const useraddController = require('../controllers/useradd.controller');

const router = express.Router();

router
  .route('/')
  .post(useraddController.createUser)

  module.exports = router;
