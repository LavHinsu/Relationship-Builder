var mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
var Schema = mongoose.Schema;
var RelationshipSchema = new Schema(
    {
        from_user: { type: String, required: true, maxlength: 100 },
        to_user: { type: String, required: true, maxlength: 100 },
        tag: { type: String, required: true, maxlength: 100 }
    }
);

RelationshipSchema.plugin(toJSON);
RelationshipSchema.plugin(paginate);

RelationshipSchema.statics.doesRelationExist = async function (from_user, to_user, tag, excludeUserId) {
    const relationship = await this.findOne({ from_user, to_user, tag, _id: { $ne: excludeUserId } });
    return !!relationship;
};

RelationshipSchema.statics.getRelationshipsofuser = async function (from_user, excludeUserId) {
    const relations = await this.find({ from_user, _id: { $ne: excludeUserId } });
    return relations;
};


const Relationships = mongoose.model('Relationships', RelationshipSchema);

module.exports = Relationships;