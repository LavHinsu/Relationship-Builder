const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { relationshipService } = require('../services');
const { getRelations } = require('../services/relationship.service');
const { countDocuments } = require('../models/user.model');

const getConnection = catchAsync(async (req, res) => {

    var result = await searchConnection(req.body.from_user, req.body.to_user);

    res.status(httpStatus.OK).send(result);
});

async function searchConnection(from_user, to_user) {
    var path = []
    var visited = []
    await pathUtil(from_user, to_user, visited, path);

    async function pathUtil(from_user, to_user, visited, path) {
        var currentNode = from_user
        visited.push(currentNode);
        path.push(currentNode);
        var connections = await getListOfConnections(currentNode);
        if (connections.includes(to_user)) {
            path.push(to_user)
            return;
        }
        else {
            for (var i = 0; i < connections.length; i++) {
                if (!visited.includes(connections[i]) && !path.includes(to_user)) {
                    await pathUtil(connections[i], to_user, visited, path)
                }
            }
        }


    }
    if(path.length==1){
        return []
    }
    return path;
}

async function getListOfConnections(from_user) {
    var param = { "from_user": from_user }
    var return_list = []
    var connections = await getRelations(param);
    connections.forEach(function (item, index) {
        return_list.push(item.to_user)
    });
    return return_list;
}

module.exports = {
    getConnection
}