const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { relationshipService } = require('../services');

const updateRelationship = catchAsync(async (req, res) => {
    const result = await relationshipService.updateRelationship(req.body);
    res.status(200).send();
});

module.exports = {
    updateRelationship
}