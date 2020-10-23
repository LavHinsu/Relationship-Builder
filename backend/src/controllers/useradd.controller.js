const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  });

const getUsers = catchAsync(async (req,res) =>{
  const users = await userService.getUsers();
  res.status(httpStatus.FOUND).send(users)
})

module.exports = {
  createUser,
  getUsers
}