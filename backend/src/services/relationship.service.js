const httpStatus = require('http-status');
const { Relationships } = require('../models')
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createRelationship = async (relationshipBody) => {
  await checkUser(relationshipBody);
  if (await Relationships.doesRelationExist(relationshipBody.from_user, relationshipBody.to_user, relationshipBody.tag)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Relationship Already Exists`);
  }
  const Relationship = await Relationships.create(relationshipBody);
  return Relationship;
};


const checkUser = async (body) => {
  if (await User.isNameTaken(body.from_user)) { }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, ` User ${body.from_user} Does not exist`);
  }
  if (await User.isNameTaken(body.to_user)) { }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, ` User ${body.to_user} Does not exist`);
  }
  return true
}

const getRelations = async (body) => {
  var documents = await Relationships.getRelationshipsofuser(body.from_user)
  return documents
}

module.exports = {
  createRelationship,
  getRelations,
  checkUser,
}