const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { relationshipService } = require('../services');

const createRelationship = catchAsync(async (req, res) => {
  const relationship = await relationshipService.createRelationship(req.body);
  res.status(httpStatus.CREATED).send(relationship);
});

module.exports = {
  createRelationship
}