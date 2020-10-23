const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');


const createUser = async (userBody) => {
  if (await User.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `User ${userBody.name} Already Exists`);
  }
  const user = await User.create(userBody);
  return user;
};
const getUserByName = async (name) => {
  return User.findOne({ name });
};
const getUsers = async () =>{
  const users = await User.getAllUsers()
  return users
}

module.exports = {
  createUser,
  getUsers
}