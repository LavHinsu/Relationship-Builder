const express = require('express');
const useraddController = require('../controllers/useradd.controller');

const router = express.Router();

router
  .route('/')
  .get(useraddController.getUsers)

  module.exports = router;
