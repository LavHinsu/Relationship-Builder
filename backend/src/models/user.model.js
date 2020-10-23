const { func } = require('@hapi/joi');
var mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
    }
);
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isNameTaken = async function (name, excludeUserId) {
    const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.statics.getAllUsers = async function (name, excludeUserId) {
    const documents = await this.distinct( 'name');
    return documents;
};

const User = mongoose.model('User', userSchema);


module.exports = User;
