"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var wsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    numOfJobs: {
        type: Number,
        default: 0
    },
    users: [{
        userID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

var WSModel = _mongoose2.default.model('Workspaces', wsSchema);

module.exports = WSModel;