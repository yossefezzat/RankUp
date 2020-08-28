import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    ownerID:{
        type: Schema.Types.ObjectId,
        required: true
    },
    numOfJobs:{
        type: Number,
        default: 0
    },
    users:[
        {
            userID: {
                type: Schema.Types.ObjectId,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
        }
    ],
    emails : {
        type : Array,
        required: false
    },
    createdDate:{
        type:Date,
        default: Date.now
    }
});

const WSModel = mongoose.model('Workspaces', wsSchema);

module.exports = WSModel;
