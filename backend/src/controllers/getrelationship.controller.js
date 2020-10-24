const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { relationshipService } = require('../services');

const getRelationship = catchAsync(async (req, res) => {
  const relationships = await relationshipService.getRelations(req.body);
  res.status(httpStatus.OK).send(relationships);
});

module.exports = {
  getRelationship
}